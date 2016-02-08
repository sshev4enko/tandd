using System;
using System.Collections.Generic;
using System.Management.Instrumentation;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using M101DotNet.Driver.Model;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Core.Clusters;

namespace M101DotNet.Driver
{
    class Program
    {
        #region Const
        // [MONGODB-DEMO] MongoDB Server connection settings.
        private const string CONNECTION_STR     = @"mongodb://localhost:27017";
        private const string DB_NAME            = "test";
        private const string COLLECTION_NAME    = "names"; // (SQL=table)

        private static readonly Dictionary<string, object> newObj = new Dictionary<string, object>
            {
                { "_id",            ObjectId.GenerateNewId() },
                { "THE_NEW_ROW",    "Document 1234567890" }
            };
        #endregion


        public static void Main(string[] args)
        {
            Console.WriteLine("[BEGIN]");

            try
            {
                MainAsync(args).GetAwaiter().GetResult();
            }
            catch (MongoConnectionException ex)
            {
                Console.WriteLine("[EXCEPTION] MongoConnectionException - " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("[EXCEPTION] " + ex.GetType() + " : " + ex.Message);
            }

            Console.WriteLine();
            Console.WriteLine("[END] Press Enter...");
            Console.ReadLine();
        }

        // [MONGODB-DEMO] Support async API.
        private static async Task MainAsync(string[] args)
        {
            #region TEST: BSON documents
            OutputBsonDocument();
            #endregion

            int repeats = 0;
            var client = new MongoClient(CONNECTION_STR);

            // This while loop is to allow us to detect if we are connected to the MongoDB server (Is server alive ?)
            while (client.Cluster.Description.State == ClusterState.Disconnected)
            {
                Thread.Sleep(250);
                if (repeats++ >= 5)
                {
                    throw new InstanceNotFoundException("Unable to connect to the MongoDB server. Please make sure that '" + client.Settings.Server.Host + "' is running");
                }
            }

            IMongoDatabase db = client.GetDatabase(DB_NAME);
            // [MONGODB-DEMO] Get collection (SQL=table): 
            // (it will be created from the scratch, if DB hasn't such collection - NO exception)
            var collection = db.GetCollection<BsonDocument>(COLLECTION_NAME); // 1) Raw\UNTYPED collection !!
            //var collection = db.GetCollection<PersonPlain>("persons_typed"); // 2) Strongly TYPED collection !!

            #region TEST: Basic DB operations
            //await CountAsync(collection);
            //InsertOne(collection);
            //await CountAsync(collection);
            //await InsertManyAsync(collection);
            await CountAsync(collection);
            await FindAllAsync(collection);
            #endregion

            #region TEST: POCO objects
            PocoPlainSerialization();
            #endregion

            #region tempo
            // [tmp-0] How to insert class object to DB (use typed collection -  .GetCollection<PetPlain>  NOT  .GetCollection<BsonDocument>).
            //var collection2 = db.GetCollection<PersonPlain>(COLLECTION_NAME);
            //await collection2.InsertOneAsync(new PersonPlain());

            // [tmp-1] For a strongly typed collection - use LINQ-similar syntax for the Find() criterea.
            //var collection3 = db.GetCollection<PersonPlain>("persons");
            //var list = await collection3.Find(p => p.Age < 30 && p.Name != "Sergii").ToListAsync();

            // [tmp-2]
            // [tmp-3]

            #endregion
        }


        #region Test Methods

        /// <summary>
        /// [MONGODB-DEMO] Create & Output simple BSON document obj (SQL=row).
        /// </summary>
        private static void OutputBsonDocument()
        {
            var doc = new BsonDocument
            {
                { "nickname", "JohnnyB"}
            };

            doc.Add("age", 66);
            doc["profession"] = "hacker";

            Console.WriteLine(doc);

            bool res = doc.Contains("age");
            BsonElement element;
            if (doc.TryGetElement("nickname", out element))
            {
                Console.WriteLine(".Name = {0}, .Value = {1} \n\n", element.Name, element.Value);
            }
        }

        /// <summary>
        /// Count documents (SQL=rows) in the collection (SQL=table).
        /// </summary>
        private static async Task CountAsync(IMongoCollection<BsonDocument> collection)
        {
            long count = await collection.CountAsync(new BsonDocument());
            Console.WriteLine("== collection.Count = {0}", count);
        }

        /// <summary>
        /// Insert a new single document (SQL=row) in the collection (SQL=table).
        /// </summary>
        private static void InsertOne(IMongoCollection<BsonDocument> collection)
        {
            Console.WriteLine("++ Insert a new single document (SQL=row) in the collection (SQL=table).");

            //var document = new BsonDocument { {"_id", ObjectId.GenerateNewId()}, { "THE NEW ROW", "Document 1234567890" } };
            var document = new BsonDocument().AddRange(newObj);
            Task t = collection.InsertOneAsync(document);
            t.Wait();

            Console.WriteLine("  status = " + t.Status);
        }

        /// <summary>
        /// Insert two documents (SQL=row) in the collection (SQL=table) as a single operation.
        /// </summary>
        private static async Task InsertManyAsync(IMongoCollection<BsonDocument> collection)
        {
            Console.WriteLine("++ Insert two documents (SQL=row) in the collection (SQL=table) as a single operation.");

            var document1 = new BsonDocument(newObj);
            // [MONGODB-DEMO] NoSQL is Unstructured (schemaless) - document1 and document2 have different set of key-value pairs.
            // [MONGODB-DEMO] There is no unique key '_id' (BsonObjectId) in document2 - will be generated by MongoDB automatically.
            var document2 = new BsonDocument
                {
                    //{ "_id",        ObjectId.GenerateNewId() },
                    { "Name",        "Sergii"},
                    { "Surname",     "Shevchenko"},
                    { "Extra info",  "Phone: 3432 523 59"}
                };
            await collection.InsertManyAsync(new [] {document1, document2});
        }

        /// <summary>
        /// [MONGODB-DEMO] Find all the documents (SQL=row) in the collection (SQL=table) + sort\filtering\limitation.
        /// </summary>
        private static async Task FindAllAsync(IMongoCollection<BsonDocument> collection)
        {
            Console.WriteLine("Find all the documents (SQL=row) in the collection (SQL=table) :");

            var filter = new BsonDocument(); // Empty filter -> Find ALL.
            //var list = await collection.Find("{ Name: 'Sergii' }").ToListAsync();
            var list = await collection.Find(filter)
                .Sort( Builders<BsonDocument>.Sort.Ascending("_id").Descending("Name") )
                //.Limit(2)
                .ToListAsync();

            foreach (var doc in list)
            {
                Console.WriteLine("   " + doc);
            }
        }

        /// <summary>
        /// [MONGODB-DEMO] The mapping from POCOs to Bson in run-time (!! this might help to break off relationship between a particular DB and Model classes).
        /// </summary>
        private static void PocoPlainSerialization()
        {
            // A convention that sets the element name the same as the class-member name with the first character lower cased.
            var conventionPack = new ConventionPack();
            conventionPack.Add(new CamelCaseElementNameConvention());
            ConventionRegistry.Register("camelCase", conventionPack, type => type.IsPublic);

            // Register BsonClassMap for the concrete class.
            // The same you can achieve with using of attributes. See class Person.
            BsonClassMap.RegisterClassMap<PersonPlain>(cm =>
            {
                cm.AutoMap();
                cm.MapMember(c => c.Name).SetElementName("new_name");
                cm.MapMember(c => c.Age).SetIgnoreIfNull(true);
            });

            var person = new PersonPlain
            {
                Name = "Benny",
                Age = 33,
                Colors = new List<string> { "red", "blue" },
                Pets = new List<PetPlain>
                    {
                        new PetPlain { Name = "Fluffy",     Type = "dog" },
                        new PetPlain { Name = "Garfield",   Type = "cat" }
                    },
                ExtraElements = new BsonDocument("additionalName", "Name2")
            };

            using (var writer = new JsonWriter(Console.Out))
            {
                BsonSerializer.Serialize(writer, person);
            }
        }

        #endregion
    }
}
