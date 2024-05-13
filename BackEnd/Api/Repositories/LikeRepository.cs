using Api.Context;
using Api.Generics;
using Api.Models;
using Microsoft.EntityFrameworkCore;
namespace Api.Repositories
{
    public class LikeRepository : Generics<Like>, ILikeRepository
    {
        public LikeRepository(DbContextOptions<AppDbContext> options, AppDbContext context) : base(options, context)
        {
        }
    }
}