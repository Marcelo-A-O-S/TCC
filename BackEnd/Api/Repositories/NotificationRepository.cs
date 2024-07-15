using Api.Context;
using Api.Generics;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class NotificationRepository : Generics<Notification>, INotificationRepository
    {
        public NotificationRepository(DbContextOptions<AppDbContext> options, AppDbContext context) : base(options, context)
        {
        }
    }
}