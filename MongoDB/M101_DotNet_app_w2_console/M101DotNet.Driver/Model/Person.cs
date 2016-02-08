using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace M101DotNet.Driver.Model
{
    /// <summary>
    /// Plain Old CLR Object (POCO).
    /// </summary>
    public class PersonPlain
    {
        public ObjectId Id { get; set; } // Mapped to '_id' field.
        public string Name { get; set; }
        public int Age { get; set; }
        public List<string> Colors { get; set; }
        public List<PetPlain> Pets { get; set; }
        public BsonDocument ExtraElements{ get; set; }
    }

    ///////////////////////////////////////////////////////////////////////////

    /// <summary>
    /// [MONGODB-DEMO] The same POCO but spiced with Mongo-BSON attributes to modify output.
    /// </summary>
    public class Person
    {
        public ObjectId Id { get; set; } // Mapped to '_id' field.

        [BsonElement("short_name")]
        public string Name { get; set; }

        [BsonRepresentation(BsonType.String)]
        public int Age { get; set; }

        public List<string> Colors { get; set; }

        public List<Pet> Pets { get; set; }

        [BsonIgnore]
        public BsonDocument ExtraElements { get; set; }
    }
}
