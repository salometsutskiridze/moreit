using Microsoft.EntityFrameworkCore;
using MoreIT.API.Models;

namespace MoreIT.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
}