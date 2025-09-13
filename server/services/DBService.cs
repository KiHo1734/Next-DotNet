using Microsoft.EntityFrameworkCore;
using Postgres.Data;
using Postgres.Models;

namespace Postgres.Services;

public class JobService
{
    private readonly AppDbContext _context;

    public JobService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Jobs>> GetAll() => await _context.Jobs.ToListAsync();

    public async Task<Jobs?> GetById(int id) => await _context.Jobs.FindAsync(id);

    public async Task<Jobs> Create(Jobs job)
    {
        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();
        return job;
    }

    public async Task Update(Jobs job)
    {
        _context.Entry(job).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var job = await _context.Jobs.FindAsync(id);
        if (job != null)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }
    }
}
