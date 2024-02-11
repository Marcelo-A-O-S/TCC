using Api.Models;
using Api.Services.Interfaces;
using Api.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostServices postServices;
        private readonly IUserServices userServices;

        public PostController(IPostServices postServices, IUserServices userServices)
        {
            this.postServices = postServices;
            this.userServices = userServices;
        }
        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<List<PostViewModel>>> List()
        {
            List<Posts> posts = await this.postServices.List();
            return Ok(posts);
        }
        [HttpGet]
        [Route("FindById")]
        public async Task<ActionResult<PostViewModel>> GetPost(int id)
        {
            Posts post = await this.postServices.FindById(id);

            return Ok(post);
        }
        [HttpGet]
        [Route("FindByUserId")]
        public async Task<ActionResult<PostViewModel>> GetPostUserId(int UserId)
        {
            Posts post = await this.postServices.FindByUserId(UserId);
            PostViewModel postView = new PostViewModel();
            postView.title = post.title;
            postView.Id = post.Id;
            postView.userId = post.userId;
            postView.description = post.description;

            
            return Ok(postView);
        }
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult> CreatePost(PostRequest postbody)
        {
            Posts post = new Posts();
            post.Id = 0;
            post.title = postbody.title;
            post.description = postbody.description;
            post.userId = postbody.userId;
            post.image = postbody.image;
            post.user = new User();
            post.user = await this.userServices.FindById(postbody.userId);
            await this.postServices.Save(post);
            return Ok("Salvo com sucesso");
        }
        [HttpPost]
        [Route("AddComment")]
        public async Task<ActionResult> AddComent(CommentRequest commentBody)
        {
            Posts post = await this.postServices.FindById(commentBody.postId);
            Comment comment = new Comment();
            comment.Id = 0;
            comment.comment = commentBody.comment;
            comment.user = await this.userServices.FindById(commentBody.userId);
            comment.post = await this.postServices.FindById(post.Id);
            post.comments.Add(comment);
            await this.postServices.Save(post);
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteById")]
        public async Task<ActionResult> DeletePostById(int postId)
        {
            Posts post = await this.postServices.FindById(postId);
            await this.postServices.Delete(post);
            return Ok();
        }
    }
}
