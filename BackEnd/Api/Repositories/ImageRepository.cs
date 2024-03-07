using Api.Context;
using Api.Generics;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class ImageRepository : Generics<Image>, IImageRepository
    {
        public ImageRepository(DbContextOptions<AppDbContext> options, AppDbContext context) : base(options, context)
        {
        }
    }
}
