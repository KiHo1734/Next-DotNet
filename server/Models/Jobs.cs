using System.ComponentModel.DataAnnotations;

namespace Postgres.Models;

public class Jobs
{
    [Key]
    public int Id { get; set; }  

    [Required]
    public string Title { get; set; } = null!;

    [Required]
    public string Type { get; set; } = null!;

    [Required]
    public string Detail { get; set; } = null!;

    public string? Purpose { get; set; }
}
