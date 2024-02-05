using Api.Context;
using Api.Generics;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class PostRepository: Generics<Posts>, IPostRepository
    {
        public PostRepository(DbContextOptions<AppDbContext> options, AppDbContext context) : base(options, context)
        {

        }
    }
}
