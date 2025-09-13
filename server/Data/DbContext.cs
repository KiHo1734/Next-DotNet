using Microsoft.EntityFrameworkCore;
using Postgres.Models;

namespace Postgres.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Jobs> Jobs { get; set; }
}
