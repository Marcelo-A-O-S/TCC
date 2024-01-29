using Api.Context;
using Api.Generics;
using Api.Generics.Interfaces;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class UserRepository : Generics<User> , IUserRepository
    {
        public UserRepository(DbContextOptions<AppDbContext> options, AppDbContext context): base(options, context)
        {

        }
    }
}
