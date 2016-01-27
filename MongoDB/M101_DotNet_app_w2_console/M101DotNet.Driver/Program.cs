using System;
using System.Threading.Tasks;
using MongoDB.Bson;
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

        static void Main(string[] args)
        {
            Console.WriteLine("[BEGIN]");
            MainAsync(args).GetAwaiter().GetResult();

            Console.WriteLine();
            Console.WriteLine("[END] Press Enter...");
            Console.ReadLine();
        }

        static async Task MainAsync(string[] args)
        {
            var client = new MongoClient(CONNECTION_STR);
            IMongoDatabase db = client.GetDatabase(DB_NAME);
            var collection = db.GetCollection<BsonDocument>(COLLECTION_NAME);

            await CountAsync(collection);
            InsertOneAsync(collection).Wait();
            await CountAsync(collection);
        }

        #region Test methods
        /// <summary>
        /// Count documents (SQL=rows) in the collection (SQL=table).
        /// </summary>
        static async Task CountAsync(IMongoCollection<BsonDocument> collection)
        {
            long count = await collection.CountAsync(new BsonDocument());
            Console.WriteLine("== collection.Count = {0}", count);
        }

        /// <summary>
        /// Insert a new single document (SQL=row) in the collection (SQL=table).
        /// </summary>
        static async Task InsertOneAsync(IMongoCollection<BsonDocument> collection)
        {
            Console.WriteLine("++ Insert a new single document (SQL=row) in the collection (SQL=table).");
            var document = new BsonDocument { {"_id", ObjectId.GenerateNewId()}, { "THE NEW ROW", "Document 1234567890" } };
            var res = await collection.InsertOneAsync(document);

        }
        #endregion
    }
}
