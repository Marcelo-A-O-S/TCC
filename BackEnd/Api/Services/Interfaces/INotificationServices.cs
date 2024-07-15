using Api.Models;

namespace Api.Services.Interfaces
{
    public interface INotificationServices : IServices<Notification>
    {
        Task<List<Notification>> FindByUserIdDescending(int userId);
    }
}