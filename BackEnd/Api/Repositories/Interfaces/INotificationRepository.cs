using Api.Generics.Interfaces;
using Api.Models;

namespace Api.Repositories.Interfaces
{
    public interface INotificationRepository : IGenerics<Notification>
    {
        Task<List<Notification>> GetNotifications();
        Task<List<Notification>> GetNotificationsDescending();
        Task<List<Notification>> GetNotificationsDescendingByUserId(int userId);
    }
}