using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace MongoExample.Models;

public class Jobs {
    public String? Id { get; set; } 
    public String title { get; set; } = null!;
    public String type { get; set; } = null!;
    public String detail { get; set; } = null!;
    public String? purpose { get; set; } = null;
    public DateTime deadline_date { get; set; }
}