using System;
using Microsoft.AspNetCore.Mvc;
using MongoExample.Models;
using MongoExample.Services;

namespace MongoExample.Controllers;

[Controller]
[Route("api/[controller]")]
public class JobsController: Controller {
    private readonly MongoDBService _mongoDBService;

    public JobsController(MongoDBService mongoDBService) {
        _mongoDBService = mongoDBService;
    }

    [HttpGet]
    public async Task<List<Jobs>> Get() {
        return await _mongoDBService.GetAllJobs();
    }

    [HttpGet("{id}")]
    public async Task<List<Jobs>> Get(string id) {
        return await _mongoDBService.GetJob(id);
    }


    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Jobs job) {
        await _mongoDBService.CreateJob(job);
        return CreatedAtAction(nameof(Get), new { id = job.Id, job});
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] Jobs job) {
        await _mongoDBService.UpdateJob(id, job.title, job);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) {
        await _mongoDBService.DeleteJob(id);
        return NoContent();
    }
}