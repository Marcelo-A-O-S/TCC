using Api.Context;
using Api.Generics;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class AnswerRepository : Generics<Answer>, IAnswerRepository
    {
        public AnswerRepository(DbContextOptions<AppDbContext> options, AppDbContext context) : base(options, context)
        {

        }
    }
}
