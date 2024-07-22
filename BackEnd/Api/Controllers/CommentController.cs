using Api.DTOs;
using Api.Models;
using Api.Services;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IPostServices postServices;
        private readonly ICommentServices commentServices;
        private readonly IUserServices userServices;
        private readonly INotificationServices notificationServices;
        private readonly IHubContext<NotificationHubService> notificationHubContext;

        public CommentController(
            IPostServices postServices, 
            ICommentServices commentServices, 
            IUserServices userServices,
            INotificationServices notificationServices,
            IHubContext<NotificationHubService> notificationHubContext)
        {
            this.postServices = postServices;
            this.commentServices = commentServices;
            this.userServices = userServices;
            this.notificationServices = notificationServices;
            this.notificationHubContext = notificationHubContext;
        }
        [Authorize]
        [HttpPost, Route("AddComment")]
        public async Task<ActionResult> AddComent(CommentDTO commentRequest)
        {
            Posts post = await this.postServices.FindById(commentRequest.postId);
            var user = await this.userServices.FindById(commentRequest.userId);
            if(user == null){
                return BadRequest("Usuário não encontrado");
            }   
            Comment comment = new Comment();
            if(commentRequest.Id != 0){
                comment.Id = commentRequest.Id;
                comment.comment = commentRequest.comment;
                comment.userId = user.Id; 
                comment.postId = post.Id;
                comment.guid = commentRequest.guid;
                comment.dateCreate = commentRequest.dateCreate;
            }else{
                comment.Id = 0;
                comment.comment = commentRequest.comment;
                comment.userId = user.Id; 
                comment.postId = post.Id;
                comment.guid = commentRequest.guid;
            }
            await this.commentServices.Save(comment);
            if(commentRequest.Id == 0){
                comment = await this.commentServices.FindByGuid(comment.guid);
                var notification = new Notification();
                notification.notificationType = NotificationType.Comment;
                notification.postsId = post.Id;
                notification.userId = post.userId;
                notification.SourceUserId = user.Id;
                notification.commentId = comment.Id;
                await this.notificationServices.Save(notification);
                await this.notificationHubContext.Clients.All.SendAsync("AddComment", post.Id, post.userId);
                return Ok("Comentário salvo com sucesso!");

            }else{
                var notification = await this.notificationServices.FindByCommentId(commentRequest.Id);
                notification.dateCreate = DateTime.Now;
                await this.notificationServices.Save(notification);
                await this.notificationHubContext.Clients.All.SendAsync("UpdateComment", post.Id, post.userId);
                return Ok("Comentário atualizado com sucesso!");
            }
        }
        [Authorize]
        [HttpPut, Route("UpdateComment")]
        public async Task<ActionResult> UpdateComment(CommentDTO commentRequest)
        {
            Comment comment = await this.commentServices.FindById(commentRequest.Id);
            var post = await this.postServices.FindById(comment.postId);
            comment.comment = commentRequest.comment;
            await this.commentServices.Save(comment);
            var notification = await this.notificationServices.FindByCommentId(commentRequest.Id);
            notification.dateCreate = DateTime.Now;
            await this.notificationServices.Save(notification);
            await this.notificationHubContext.Clients.All.SendAsync("UpdateComment", post.Id, post.userId);
            return Ok("Comentário atualizado com sucesso!");
        }
        [Authorize]
        [HttpDelete, Route("DeleteComment")]
        public async Task<ActionResult> DeleteComment(CommentDTO commentRequest)
        {
            Comment comment = await this.commentServices.FindById(commentRequest.Id);
            var post = await this.postServices.FindById(comment.postId);
            await this.commentServices.Delete(comment);
            var notification = await this.notificationServices.FindByCommentId(commentRequest.Id);
            await this.notificationServices.Delete(notification);
            await this.notificationHubContext.Clients.All.SendAsync("RemoveComment", post.Id, post.userId);
            return Ok("Comentário deletado com sucesso!");
        }
        [Authorize]
        [HttpDelete, Route("DeleteCommentById")]
        public async Task<ActionResult> DeleteCommentById(int commentId){
            Comment comment = await this.commentServices.FindById(commentId);
            var post = await this.postServices.FindById(comment.postId);
            await this.commentServices.Delete(comment);
            var notification = await this.notificationServices.FindByCommentId(commentId);
            await this.notificationServices.Delete(notification);
            await this.notificationHubContext.Clients.All.SendAsync("RemoveComment", post.Id, post.userId);
            return Ok("Comentário deletado com sucesso!");
        }
    }
}
