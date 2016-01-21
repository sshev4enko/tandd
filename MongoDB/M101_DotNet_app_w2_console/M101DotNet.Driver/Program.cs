using System;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace M101DotNet.Driver
{
    class Program
    {
        static void Main(string[] args)
        {
            MainAsync(args).GetAwaiter().GetResult();

            Console.WriteLine();
            Console.WriteLine("Press Enter");
            Console.ReadLine();
        }

        static async Task MainAsync(string[] args)
        {
            var client = new MongoClient();
        }
    }
}
