using Api.DTOs;
using Api.Models;
using Api.Services;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase{
        private readonly IPostServices postServices;
        private readonly ILikeServices likeServices;
        private readonly INotificationServices notificationServices;
        private readonly IHubContext<NotificationHubService> notificationHubContext;

        public LikeController(
            IPostServices postServices, 
            ICommentServices commentServices,
            ILikeServices likeServices,
            INotificationServices notificationServices,
            IHubContext<NotificationHubService> notificationHubContext
            )
        {
            this.likeServices = likeServices;
            this.notificationServices = notificationServices;
            this.notificationHubContext = notificationHubContext;
            this.postServices = postServices;
        }
        [Authorize]
        [HttpPost, Route("Add")]
        public async Task<ActionResult> AddLikePost(LikeDTO likeRequest){
            var notification = new Notification();
            if (likeRequest == null){
                return BadRequest("Campos inválidos!");
            }
            var like = new Like();
            var post = await this.postServices.FindById(likeRequest.postId);
            if(post == null){
                return NotFound("Publicação não encontrada!");
            }
            like.postId = likeRequest.postId;
            like.userId = likeRequest.userId;
            like.guid = likeRequest.Guid;
            like.Id = 0;
            try{
                await this.likeServices.Save(like);
                var likeData = await this.likeServices.FindByGuid(like.guid);
                notification.userId = post.userId;
                notification.postsId = post.Id;
                notification.notificationType = NotificationType.Like;
                notification.SourceUserId = like.userId;
                notification.likeId = likeData.Id;
                await this.notificationServices.Save(notification);
                await this.notificationHubContext.Clients.All.SendAsync("AddLike", like.postId, like.userId);
                return Ok();
            }catch(Exception err){
                return BadRequest(err.Message);
            }
        }
        [Authorize]
        [HttpDelete, Route("Delete")]
        public async Task<ActionResult> RemoveLike(LikeDTO likeRequest){
            return Ok();
        }
        [Authorize]
        [HttpDelete, Route("DeleteById")]
        public async Task<ActionResult> RemoveLikeById(int likeId){
            try{
                var like = await this.likeServices.FindById(likeId);
                if(like == null){
                    return NotFound();
                }
                await this.likeServices.Delete(like);
                var notification = await this.notificationServices.FindByLikeId(likeId);
                await this.notificationServices.Delete(notification);
                await this.notificationHubContext.Clients.All.SendAsync("RemoveLike", like.postId, like.userId);
                return Ok("Removido com sucesso");
            }catch(Exception err){
                return BadRequest(err.Message);
            }
        }
        [Authorize]
        [HttpGet, Route("List")]
        public async Task<ActionResult> ListLikes(){

            return Ok();
        }
    }
}