using System.Linq.Expressions;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;
using Api.ViewModel;

namespace Api.Services
{
    public class NotificationServices : INotificationServices
    {
        private readonly INotificationRepository notificationRepository;

        public NotificationServices(INotificationRepository notificationRepository)
        {
            this.notificationRepository = notificationRepository;
        }

        public async Task Delete(Notification entidade)
        {
            await this.notificationRepository.Delete(entidade);
        }

        public async Task DeleteById(int Id)
        {
            await this.notificationRepository.DeleteById(Id);
        }

        public async Task<List<Notification>> FindAll()
        {
            var list = await this.notificationRepository.List();
            return list;
        }

        public async Task<Notification> FindBy(Expression<Func<Notification, bool>> predicate)
        {
            return await this.notificationRepository.FindBy(predicate);
        }

        public async Task<Notification> FindByAnswerId(int answerId)
        {
            return await this.notificationRepository.FindBy(notification => notification.answerId == answerId);
        }

        public async Task<Notification> FindByCommentId(int commentId)
        {
            return await this.notificationRepository.FindBy(notification => notification.commentId == commentId);
        }

        public async Task<Notification> FindByGuid(string guid)
        {
            return await this.notificationRepository.FindBy(notification => notification.guid == guid);
        }

        public async Task<Notification> FindById(int Id)
        {
            return await this.notificationRepository.FindBy(notification => notification.Id == Id);
        }

        public async Task<Notification> FindByLikeId(int likeId)
        {
            return await this.notificationRepository.FindBy(notification => notification.likeId == likeId);
        }

        public Task<Notification> FindByPostId(int postId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Notification>> FindByUserIdDescending(int userId)
        {
            return await this.notificationRepository.FindAllAndDescendingBy(search => search.userId == userId, descending => descending.Id);
        }

        public async Task<List<NotificationViewModel>> GetNotificationViewModelsByUserId(int userId)
        {
            var notifications = await this.notificationRepository.GetNotificationsDescendingByUserId(userId);

            var notificationViewModels = notifications.Select(notification => new NotificationViewModel{
                Id = notification.Id,
                answerView = new AnswerViewModel{
                    answer = notification.answer.answer,
                    commentId = notification.answer.commentId,
                    dateCreate = notification.answer.dateCreate,
                    guid = notification.answer.guid,
                    Id = notification.answer.Id,
                    postId = notification.answer.postsId,
                    userId = notification.answer.userId,
                },
                commentview = new CommentViewModel{
                    Id = notification.comment.Id,
                    comment = notification.comment.comment,
                    guid = notification.comment.guid,
                    dateCreate = notification.comment.dateCreate,
                    postId = notification.comment.postId,
                    userId = notification.comment.userId,
                    answers = notification.comment.answers.Select(answer => new AnswerViewModel{
                        Id = answer.Id,
                        answer = answer.answer,
                        commentId = answer.commentId,
                        dateCreate = answer.dateCreate,
                        guid = answer.guid,
                        postId = answer.postsId,
                        userId = answer.userId,
                    }).ToList()
                },
                guid = notification.guid,
                dateCreate = notification.dateCreate,
                IsRead = notification.IsRead,
                likeview = new LikeViewModel{
                    Id = notification.like.Id,
                    guid = notification.like.guid,
                    postId = notification.like.postId,
                    userId = notification.like.userId,
                },
                notificationType = notification.notificationType,
                sourceuser = new UserViewModel{
                    email= notification.SourceUser.email,
                    Id= notification.SourceUser.Id,
                    token = "",
                    username = notification.SourceUser.username,
                },
                userView = new UserViewModel{
                    email= notification.SourceUser.email,
                    Id= notification.SourceUser.Id,
                    token = "",
                    username = notification.SourceUser.username,
                },
            }).ToList();
            return notificationViewModels;
        }

        public async Task<List<Notification>> List()
        {
            var list = await this.notificationRepository.List();
            return list;
        }

        public async Task<List<Notification>> ListDescendingBy<TKey>(Expression<Func<Notification, TKey>> predicate)
        {
            return await this.notificationRepository.ListDescendingBy<TKey>(predicate);
        }

        public async Task Save(Notification entidade)
        {
            if(entidade.Id == 0){
                await this.notificationRepository.Save(entidade);
            }else{
                await this.notificationRepository.Update(entidade);
            }
        }

        public async Task Update(Notification entidade)
        {
            await this.notificationRepository.Update(entidade);
        }
    }
}