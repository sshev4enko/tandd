using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;

namespace M101DotNet.Driver.Model
{
    /// <summary>
    /// Plain Old CLR Object (POCO).
    /// </summary>
    class PersonPlain
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public List<string> Colors { get; set; }
        public List<PetPlain> Pets { get; set; }
        public BsonDocument ExtraElements{ get; set; }
    }

    ///////////////////////////////////////////////////////////////////////////

    class Person
    {
    }
}
