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
            var notificationViewModels = notifications.Select(notification =>
            {
                if (notification == null)
                {
                    return null;
                }

                var notificationview = new NotificationViewModel();
                notificationview.Id = notification.Id;
                notificationview.dateCreate = notification.dateCreate;
                notificationview.IsRead = notification.IsRead;
                notificationview.guid = notification.guid;
                notificationview.notificationType = notification.notificationType;
                if(notification.like != null){
                    notificationview.likeview.Id = notification.like.Id;
                    notificationview.likeview.guid = notification.like.guid;
                    notificationview.likeview.postId = notification.like.postId;
                    notificationview.likeview.userId = notification.like.userId;
                }
                if(notification.answer !=  null){
                    notificationview.answerView.answer = notification.answer.answer;
                    notificationview.answerView.Id = notification.answer.Id;
                    notificationview.answerView.commentId = notification.answer.commentId;
                    notificationview.answerView.dateCreate = notification.answer.dateCreate;
                    notificationview.answerView.guid = notification.answer.guid;
                    notificationview.answerView.postId = notification.answer.postsId;
                    notificationview.answerView.userId = notification.answer.userId;
                }
                if(notification.comment != null){
                    notificationview.commentview.comment = notification.comment.comment;
                    notificationview.commentview.dateCreate = notification.comment.dateCreate;
                    notificationview.commentview.postId = notification.comment.postId;
                    notificationview.commentview.userId = notification.comment.userId;
                    notificationview.commentview.guid = notification.comment.guid;
                    notificationview.commentview.Id = notification.comment.Id;
                    if(notification.comment.answers != null){
                        notificationview.commentview.answers = notification.comment.answers.Select(answer=>new AnswerViewModel{
                            answer = answer.answer,
                            commentId = answer.commentId,
                            dateCreate = answer.dateCreate,
                            guid = answer.guid,
                            Id = answer.Id,
                            postId = answer.postsId,
                            userId = answer.userId,
                        }).ToList();
                    }
                }
                if(notification.SourceUser != null){
                    notificationview.sourceuser.email = notification.SourceUser.email;
                    notificationview.sourceuser.username = notification.SourceUser.username;
                    notificationview.sourceuser.Id = notification.SourceUser.Id;
                    notificationview.sourceuser.token = "";
                }
                if(notification.user != null){
                    notificationview.userView.email = notification.user.email;
                    notificationview.userView.username = notification.user.username;
                    notificationview.userView.Id = notification.user.Id;
                    notificationview.userView.token = "";
                }
                if(notification.posts != null){
                    
                    notificationview.postView.Id = notification.posts.Id;
                    notificationview.postView.description = notification.posts.description;
                    notificationview.postView.dateCreate = notification.posts.dateCreate;
                    notificationview.postView.title = notification.posts.title;
                    notificationview.postView.guid = notification.posts.guid;
                    if(notification.posts.user != null){
                        notificationview.postView.userview.email = notification.posts.user.email;
                        notificationview.postView.userview.username = notification.posts.user.username;
                        notificationview.postView.userview.Id = notification.posts.user.Id;
                        notificationview.postView.userview.token = "";
                    }
                    if(notification.posts.likes != null){
                        notificationview.postView.likeViews = notification.posts.likes.Select(like => new LikeViewModel{
                            guid= like.guid,
                            Id= like.Id,
                            postId= like.postId,
                            userId = like.userId
                        }).ToList();
                    }
                    if(notification.posts.images != null){
                        notificationview.postView.imagesViews = notification.posts.images.Select(image => new ImageViewModel{
                            Description = image.Description,
                            Id = image.Id,
                            image = image.image,
                            imageGuid = image.imageGuid,
                        }).ToList();
                    }
                    if(notification.posts.comments != null){
                        notificationview.postView.commentViews = notification.posts.comments.Select(comment =>{
                            var commentview = new CommentViewModel();
                            commentview.comment = comment.comment;
                            commentview.guid = comment.guid;
                            commentview.dateCreate = comment.dateCreate;
                            commentview.Id = comment.Id;
                            commentview.postId = comment.postId;
                            commentview.userId = comment.userId;
                            if(comment.answers != null){
                                commentview.answers = comment.answers.Select(answer => new AnswerViewModel{
                                    answer = answer.answer,
                                    commentId = answer.commentId,
                                    dateCreate = answer.dateCreate,
                                    guid = answer.guid,
                                    postId = answer.postsId,
                                    userId = answer.userId,
                                    Id = answer.Id,
                                }).ToList();
                            }
                            return commentview;
                        }).ToList();
                    }
                }
                return notificationview;
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
            if (entidade.Id == 0)
            {
                await this.notificationRepository.Save(entidade);
            }
            else
            {
                await this.notificationRepository.Update(entidade);
            }
        }

        public async Task Update(Notification entidade)
        {
            await this.notificationRepository.Update(entidade);
        }
    }
}
