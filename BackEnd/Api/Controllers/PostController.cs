using Api.DTOs;
using Api.Models;
using Api.Services;
using Api.Services.Interfaces;
using Api.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostServices postServices;
        private readonly IUserServices userServices;
        private readonly ICommentServices commentServices;
        private readonly IAnswerServices answerServices;
        private readonly IImageServices imageServices;
        private readonly ILikeServices likeServices;
        private readonly INotificationServices notificationServices;
        private readonly IHubContext<NotificationHubService> notificationHubContext;
        public PostController(
            IPostServices postServices,
            IUserServices userServices,
            ICommentServices commentServices,
            IAnswerServices answerServices,
            IImageServices imageServices,
            ILikeServices likeServices,
            INotificationServices notificationServices,
            IHubContext<NotificationHubService> notificationHubContext
            )
        {
            this.postServices = postServices;
            this.userServices = userServices;
            this.commentServices = commentServices;
            this.answerServices = answerServices;
            this.imageServices = imageServices;
            this.likeServices = likeServices;
            this.notificationServices = notificationServices;
            this.notificationHubContext = notificationHubContext;
        }
        [Authorize]
        [HttpGet, Route("List")]
        public async Task<ActionResult<List<PostViewModel>>> List()
        {
            var postviews = await this.postServices.GetPostViews();
            return Ok(postviews);
        }
        [Authorize]
        [HttpGet, Route("FindById")]
        public async Task<ActionResult<PostViewModel>> GetPost(int id)
        {
            var postview = await this.postServices.GetPostViewModelById(id);
            if(postview == null){
                return NotFound("Nada encontrado");
            }
            return Ok(postview);
        }
        [Authorize]
        [HttpGet, Route("FindByUserId")]
        public async Task<ActionResult<List<PostViewModel>>> GetPostUserId(int UserId)
        {
            var postsViews = await this.postServices.GetAllPostViewModelDescendingByUserId(UserId);
            return Ok(postsViews);
        }
        [Authorize]
        [HttpPost, Route("Create")]
        public async Task<ActionResult> CreatePost(PostDTO postRequest)
        {
            Posts post = new Posts();
            if (postRequest.id == 0)
            {
                post.Id = 0;
                post.guid = postRequest.guid;
                post.title = postRequest.title;
                post.description = postRequest.description;
                post.images = new List<Image>();
                if (postRequest.images != null)
                {
                    foreach (var imageview in postRequest.images)
                    {
                        var image = new Image();
                        image.Id = imageview.Id;
                        image.Description = imageview.Description;
                        image.type = imageview.type;
                        image.image = imageview.image;
                        image.imageGuid = imageview.imageGuid;
                        post.images.Add(image);
                    }
                }
                var user = await this.userServices.FindById(postRequest.userId);
                if (user == null)
                {
                    return BadRequest("Usuário inválido.");
                }
                post.userId = user.Id;
                try
                {
                    await this.postServices.Save(post);
                    await this.notificationHubContext.Clients.All.SendAsync("CreatePost", post.userId);
                    return Ok("Salvo com sucesso");
                }
                catch (Exception err)
                {
                    return BadRequest(err.Message);
                }

            }
            else
            {
                post.Id = postRequest.id;
                post.title = postRequest.title;
                post.description = postRequest.description;
                if (postRequest.images != null)
                {
                    //Responsavel por deletar as ocorrencias deletadas no front end
                    var imagesPost = await this.imageServices.FindImagesByPostId(postRequest.id);
                    for (int i = 0; i < imagesPost.Count; i++)
                    {
                        var imagepost = imagesPost[i];
                        var imageview = postRequest.images.Find(x => x.imageGuid == imagepost.imageGuid);
                        if (imageview == null)
                        {
                            await this.imageServices.DeleteById(imagepost.Id);
                        }
                    }
                    //Responsavel por atualizar ou salvar ocorrencias de imagens na lista 
                    foreach (var imageview in postRequest.images)
                    {
                        var image = await this.imageServices.FindBy(x => x.imageGuid == imageview.imageGuid);
                        if (image == null)
                        {
                            image = new Image();
                            image.Id = 0;
                            image.Description = imageview.Description;
                            image.type = imageview.type;
                            image.image = imageview.image;
                            image.imageGuid = imageview.imageGuid;
                            image.posts = post;
                            image.postsId = post.Id;
                            await this.imageServices.Save(image);
                            image = await this.imageServices.FindBy(x => x.imageGuid == imageview.imageGuid);
                        }
                        else
                        {
                            image.Description = imageview.Description;
                            image.type = imageview.type;
                            image.image = imageview.image;
                            image.imageGuid = imageview.imageGuid;
                            image.posts = post;
                            image.postsId = post.Id;
                        }
                        post.images.Add(image);
                    }
                }
                post.user = await this.userServices.FindById(postRequest.userId);
                post.userId = post.user.Id;
                await this.postServices.Save(post);
                await this.notificationHubContext.Clients.All.SendAsync("UpdatePost", post.Id, post.userId);
                return Ok("Atualizado com sucesso");
            }
        }
        [Authorize]
        [HttpDelete, Route("DeleteById")]
        public async Task<ActionResult> DeletePostById(int postId)
        {
            Posts post = await this.postServices.FindById(postId);
            await this.postServices.Delete(post);
            await this.notificationHubContext.Clients.All.SendAsync("DeletePost", post.userId);
            return Ok();
        }

    }

}
