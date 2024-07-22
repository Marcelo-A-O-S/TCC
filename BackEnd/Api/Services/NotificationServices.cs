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
                    return new NotificationViewModel();
                }

                return new NotificationViewModel
                {
                    Id = notification.Id,
                    answerView = notification.answer != null ? new AnswerViewModel
                    {
                        answer = notification.answer.answer,
                        commentId = notification.answer.commentId,
                        dateCreate = notification.answer.dateCreate,
                        guid = notification.answer.guid,
                        Id = notification.answer.Id,
                        postId = notification.answer.postsId,
                        userId = notification.answer.userId,
                    } : null,
                    commentview = notification.comment != null ? new CommentViewModel
                    {
                        Id = notification.comment.Id,
                        comment = notification.comment.comment,
                        guid = notification.comment.guid,
                        dateCreate = notification.comment.dateCreate,
                        postId = notification.comment.postId,
                        userId = notification.comment.userId,
                        answers = notification.comment.answers?.Select(answer => new AnswerViewModel
                        {
                            Id = answer.Id,
                            answer = answer.answer,
                            commentId = answer.commentId,
                            dateCreate = answer.dateCreate,
                            guid = answer.guid,
                            postId = answer.postsId,
                            userId = answer.userId,
                        }).ToList() ?? new List<AnswerViewModel>()
                    } : null,
                    guid = notification.guid,
                    dateCreate = notification.dateCreate,
                    IsRead = notification.IsRead,
                    likeview = notification.like != null ? new LikeViewModel
                    {
                        Id = notification.like.Id,
                        guid = notification.like.guid,
                        postId = notification.like.postId,
                        userId = notification.like.userId,
                    } : null,
                    notificationType = notification.notificationType,
                    sourceuser = notification.SourceUser != null ? new UserViewModel
                    {
                        email = notification.SourceUser.email,
                        Id = notification.SourceUser.Id,
                        token = "",
                        username = notification.SourceUser.username,
                    } : null,
                    userView = notification.user != null ? new UserViewModel
                    {
                        email = notification.user.email,
                        Id = notification.user.Id,
                        token = "",
                        username = notification.user.username,
                    } : null,
                    postView = notification.posts != null ? new PostViewModel
                    {
                        Id = notification.posts.Id,
                        guid = notification.posts.guid,
                        description = notification.posts.description,
                        title = notification.posts.title,
                        dateCreate = notification.posts.dateCreate,
                        imagesViews = notification.posts.images?.Select(image => new ImageViewModel
                        {
                            Id = image.Id,
                            Description = image.Description,
                            image = image.image,
                            imageGuid = image.imageGuid,
                            type = image.type,
                        }).ToList() ?? new List<ImageViewModel>(),
                        likeViews = notification.posts.likes?.Select(like => new LikeViewModel
                        {
                            Id = like.Id,
                            guid = like.guid,
                            postId = like.postId,
                            userId = like.userId,
                        }).ToList() ?? new List<LikeViewModel>(),
                        userview = notification.posts.user != null ? new UserViewModel
                        {
                            email = notification.posts.user.email,
                            Id = notification.user.Id,
                            username = notification.user.username,
                            token = ""
                        } : null,
                        commentViews = notification.posts.comments?.Select(comment => new CommentViewModel
                        {
                            Id = comment.Id,
                            comment = comment.comment,
                            guid = comment.guid,
                            dateCreate = comment.dateCreate,
                            postId = comment.postId,
                            userId = comment.userId,
                            answers = comment.answers?.Select(answer => new AnswerViewModel
                            {
                                Id = answer.Id,
                                answer = answer.answer,
                                commentId = answer.commentId,
                                dateCreate = answer.dateCreate,
                                guid = answer.guid,
                                postId = answer.postsId,
                                userId = answer.userId,
                            }).ToList() ?? new List<AnswerViewModel>(),
                        }).ToList() ?? new List<CommentViewModel>()
                    } : null,
                };
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
