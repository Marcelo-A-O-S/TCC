using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options ): base(options) 
        {
            
        }
        public DbSet<User> users { get; set; }
        public DbSet<Posts> posts { get; set; }
        public DbSet<Comment> comments { get; set; }
        public DbSet<Answer> answers { get; set; }
        public DbSet<Image> images { get; set; }
        public DbSet<Like> likes { get; set; }
    }
}
