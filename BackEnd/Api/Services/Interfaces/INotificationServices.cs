using Api.Models;
using Api.ViewModel;

namespace Api.Services.Interfaces
{
    public interface INotificationServices : IServices<Notification>
    {
        Task<List<Notification>> FindByUserIdDescending(int userId);

        Task<Notification> FindByLikeId(int likeId);

        Task<Notification> FindByCommentId(int commentId);
        Task<Notification> FindByAnswerId(int answerId);
        Task<Notification> FindByPostId(int postId);

        Task<List<NotificationViewModel>> GetNotificationViewModelsByUserId(int userId);
        
    }
}