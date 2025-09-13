using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Postgres.Services;
using Postgres.Models;

namespace Postgres.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly JobService _jobService;

    public JobsController(JobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Jobs>>> GetJobs()
    {
        return await _jobService.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Jobs>> GetJob(int id)
    {
        var job = await _jobService.GetById(id);
        if (job == null) return NotFound();
        return job;
    }

    [HttpPost]
    public async Task<ActionResult<Jobs>> PostJob(Jobs job)
    {
        var createdJob = await _jobService.Create(job);
        return CreatedAtAction(nameof(GetJob), new { id = createdJob.Id }, createdJob);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutJob(int id, Jobs job)
    {
        job.Id = id; 
        await _jobService.Update(job);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        await _jobService.Delete(id);
        return NoContent();
    }
}
