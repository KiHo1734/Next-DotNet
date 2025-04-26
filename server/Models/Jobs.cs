using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace MongoExample.Models;

public class Jobs {

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore]
    public string? Id { get; set; } 

    public string title { get; set; } = null!;

    public string type { get; set; } = null!;

    public string detail { get; set; } = null!;

    public string? purpose { get; set; } = null;
}

