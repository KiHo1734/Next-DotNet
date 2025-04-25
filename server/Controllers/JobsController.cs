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
        return await _mongoDBService.GetAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Jobs jobs) {
        await _mongoDBService.CreateAsync(jobs);
        return CreatedAtAction(nameof(Get), new { id = jobs.Id, jobs});
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AddToJobs(string id, Jobs updatedJob) {
        await _mongoDBService.AddToJobsAsync(id, updatedJob);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id) {
        await _mongoDBService.DeleteAsync(id);
        return NoContent();
    }
}