using System;
using MongoDB.Bson.Serialization.Attributes;

namespace M101DotNet.Driver.Model
{
    /// <summary>
    /// Plain Old CLR Object (POCO).
    /// </summary>
    public class PetPlain
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }

    ///////////////////////////////////////////////////////////////////////////

    /// <summary>
    /// The same POCO but spiced with Mongo-BSON attributes to modify output.
    /// </summary>
    public class Pet
    {
        public string Name { get; set; }

        [BsonIgnore]
        public string Type { get; set; }
    }
}
