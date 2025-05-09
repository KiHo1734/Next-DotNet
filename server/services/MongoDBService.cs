using MongoExample.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace MongoExample.Services;

public class MongoDBService {

    private readonly IMongoCollection<Jobs> _jobCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings ) {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _jobCollection = database.GetCollection<Jobs>(mongoDBSettings.Value.CollectionName);
    }

    public async Task CreateJob(Jobs job) {
        await _jobCollection.InsertOneAsync(job);
        return;
    }

    public async Task<List<Jobs>> GetAllJobs() {
        return await _jobCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<List<Jobs>> GetJob(string id) {
        FilterDefinition<Jobs> filter = Builders<Jobs>.Filter.Eq("Id", id);
        return await _jobCollection.Find(filter).ToListAsync();;
    }

    public async Task UpdateJob(string id, string title, Jobs updatedJob) {
        FilterDefinition<Jobs> filter = Builders<Jobs>.Filter.Eq("Id", id);
        updatedJob.Id = id;
        await _jobCollection.ReplaceOneAsync(filter, updatedJob);
        return;
    }

    public async Task DeleteJob(string id) {
        FilterDefinition<Jobs> filter = Builders<Jobs>.Filter.Eq("Id", id);
        await _jobCollection.DeleteOneAsync(filter);
        return;
    }

    internal async Task UpdateJob(string id, string title, string type, string detail, string? purpose)
    {
        throw new NotImplementedException();
    }
}