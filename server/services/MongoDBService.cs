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

    public async Task CreateAsync(Jobs jobs) {
        await _jobCollection.InsertOneAsync(jobs);
        return;
    }

    public async Task<List<Jobs>> GetAsync() {
        return await _jobCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task AddToJobsAsync(string id, Jobs updatedJob) {
        FilterDefinition<Jobs> filter = Builders<Jobs>.Filter.Eq("Id", id);
        updatedJob.Id = id;
        await _jobCollection.ReplaceOneAsync(filter, updatedJob);
        return;
    }

    public async Task DeleteAsync(string id) {
        FilterDefinition<Jobs> filter = Builders<Jobs>.Filter.Eq("Id", id);
        await _jobCollection.DeleteOneAsync(filter);
        return;
    }

    internal async Task UpdateAsync(string id, Jobs updatedJob)
    {
        throw new NotImplementedException();
    }

    internal async Task AddToJobsAsync(Jobs jobs)
    {
        throw new NotImplementedException();
    }
}