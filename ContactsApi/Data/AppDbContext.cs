using ContactsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Contact> Contacts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>()
            .HasIndex(c => c.Email)
            .IsUnique();
    }
}
