using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using M101DotNet.Driver.Model;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace M101DotNet.Driver
{
    class Program
    {
        #region Const
        private const string CONNECTION_STR     = @"mongodb://localhost:27017";
        private const string DB_NAME            = "test";
        private const string COLLECTION_NAME    = "names";
        #endregion

        private static readonly Dictionary<string, object> newObj = new Dictionary<string, object>
            {
                { "_id",            ObjectId.GenerateNewId() },
                { "THE_NEW_ROW",    "Document 1234567890" }
            };


        public static void Main(string[] args)
        {
            Console.WriteLine("[BEGIN]");
            MainAsync(args).GetAwaiter().GetResult();

            Console.WriteLine();
            Console.WriteLine("[END] Press Enter...");
            Console.ReadLine();
        }

        private static async Task MainAsync(string[] args)
        {
            OutputBsonDocument();

            var client = new MongoClient(CONNECTION_STR);
            IMongoDatabase db = client.GetDatabase(DB_NAME);
            var collection = db.GetCollection<BsonDocument>(COLLECTION_NAME);

            #region TEST: Basic DB operations
            // await CountAsync(collection);
            // InsertOne(collection);
            // await CountAsync(collection);
            #endregion

            #region TEST: POCO objects
            PocoPlain();
            #endregion
        }


        #region Test Methods

        /// <summary>
        /// Create & Output simple BSON document obj (SQL=row).
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

        private static void PocoPlain()
        {
            var personPlain = new PersonPlain
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
                BsonSerializer.Serialize(writer, personPlain);
            }
        }

        #endregion
    }
}
