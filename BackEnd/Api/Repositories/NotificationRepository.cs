using Api.Context;
using Api.Generics;
using Api.Models;
using Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class NotificationRepository : Generics<Notification>, INotificationRepository
    {
        private readonly DbContextOptions<AppDbContext> options;
        private readonly AppDbContext context;

        public NotificationRepository(DbContextOptions<AppDbContext> options, AppDbContext context) : base(options, context)
        {
            this.options = options;
            this.context = context;
        }

        public async Task<List<Notification>> GetNotifications()
        {
            var notifications = await this.context.notifications
            .Include(modelUser => modelUser.user)
            .Include(modelPost => modelPost.posts)
            .Include(modelComment => modelComment.comment)
            .Include(modelLike => modelLike.like)
            .Include(modelAnswer => modelAnswer.answer)
            .Include(modelSource => modelSource.SourceUser)
            .ToListAsync();
            return notifications;
        }

        public async Task<List<Notification>> GetNotificationsDescending()
        {
            var notifications = await this.context.notifications
            .Include(modelUser => modelUser.user)
            .Include(modelPost => modelPost.posts)
            .Include(modelComment => modelComment.comment)
            .Include(modelLike => modelLike.like)
            .Include(modelAnswer => modelAnswer.answer)
            .Include(modelSource => modelSource.SourceUser)
            .OrderByDescending(x=> x.dateCreate)
            .ToListAsync();
            return notifications;
        }

        public async Task<List<Notification>> GetNotificationsDescendingByUserId(int userId)
        {
            var notifications = await this.context.notifications
            .Include(modelUser => modelUser.user)
            .Include(modelPost => modelPost.posts)
            .Include(modelComment => modelComment.comment)
            .Include(modelLike => modelLike.like)
            .Include(modelAnswer => modelAnswer.answer)
            .Include(modelSource => modelSource.SourceUser)
            .Where(x=> x.userId == userId)
            .ToListAsync();
            return notifications;
        }
    }
}