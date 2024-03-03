using Api.Models;
using Api.Services.Interfaces;
using Api.ViewModel;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ICommentServices commentServices;
        private readonly IAnswerServices answerServices;

        public PostController(
            IPostServices postServices, 
            IUserServices userServices, 
            ICommentServices commentServices,
            IAnswerServices answerServices
            )
        {
            this.postServices = postServices;
            this.userServices = userServices;
            this.commentServices = commentServices;
            this.answerServices = answerServices;
        }
        [Authorize]
        [HttpGet, Route("List")]
        public async Task<ActionResult<List<PostViewModel>>> List()
        {
            List<Posts> posts = await this.postServices.List();
            List<PostViewModel> postsViews = new List<PostViewModel>();
            foreach (var item in posts)
            {
                var postview = new PostViewModel();
                postview.Id = item.Id;
                if(item.images != null)
                {
                    foreach (var image in item.images)
                    {
                        var imageview = new ImageViewModel();
                        imageview.Id = image.Id;
                        imageview.Description = image.Description;
                        postview.imagesViews.Add(imageview);
                    }

                }
                postview.description = item.description;
                postview.title = item.title;
                postview.userId = item.userId;
                if(item.comments != null)
                {
                    foreach (var comment in item.comments)
                    {
                        var commentview = new CommentViewModel();
                        commentview.Id = comment.Id;
                        commentview.comment = comment.comment;
                        commentview.postId = comment.postId;
                        commentview.userId = comment.userId;
                        if(commentview.answers != null)
                        {
                            foreach (var answer in comment.answers)
                            {
                                var answerview = new AnswerViewModel();
                                answerview.Id = answer.Id;
                                answerview.answer = answer.answer;
                                answerview.userId = answer.userId;
                                answerview.commentId = answer.commentId;
                                commentview.answers.Add(answerview);
                            }
                        }
                        postview.commentViews.Add(commentview);
                    }
                }
                postsViews.Add(postview);
            }
            return Ok(postsViews);
        }
        [Authorize]
        [HttpGet, Route("FindById")]
        public async Task<ActionResult<PostViewModel>> GetPost(int id)
        {
            Posts post = await this.postServices.FindById(id);
            var postview = new PostViewModel();
            postview.Id = post.Id;
            if (post.images != null)
            {
                foreach (var image in post.images)
                {
                    var imageview = new ImageViewModel();
                    imageview.Id = image.Id;
                    imageview.Description = image.Description;
                    postview.imagesViews.Add(imageview);
                }

            }
            postview.description = post.description;
            postview.title = post.title;
            postview.userId = post.userId;
            if (post.comments != null)
            {
                foreach (var comment in post.comments)
                {
                    var commentview = new CommentViewModel();
                    commentview.Id = comment.Id;
                    commentview.comment = comment.comment;
                    commentview.postId = comment.postId;
                    commentview.userId = comment.userId;
                    if (commentview.answers != null)
                    {
                        foreach (var answer in comment.answers)
                        {
                            var answerview = new AnswerViewModel();
                            answerview.Id = answer.Id;
                            answerview.answer = answer.answer;
                            answerview.userId = answer.userId;
                            answerview.commentId = answer.commentId;
                            commentview.answers.Add(answerview);
                        }
                    }
                    postview.commentViews.Add(commentview);
                }
            }
            return Ok(postview);
        }
        [Authorize]
        [HttpGet, Route("FindByUserId")]
        public async Task<ActionResult<PostViewModel>> GetPostUserId(int UserId)
        {
            Posts post = await this.postServices.FindByUserId(UserId);
            var postview = new PostViewModel();
            postview.Id = post.Id;
            if (post.images != null)
            {
                foreach (var image in post.images)
                {
                    var imageview = new ImageViewModel();
                    imageview.Id = image.Id;
                    imageview.Description = image.Description;
                    postview.imagesViews.Add(imageview);
                }

            }
            postview.description = post.description;
            postview.title = post.title;
            postview.userId = post.userId;
            if (post.comments != null)
            {
                foreach (var comment in post.comments)
                {
                    var commentview = new CommentViewModel();
                    commentview.Id = comment.Id;
                    commentview.comment = comment.comment;
                    commentview.postId = comment.postId;
                    commentview.userId = comment.userId;
                    if (commentview.answers != null)
                    {
                        foreach (var answer in comment.answers)
                        {
                            var answerview = new AnswerViewModel();
                            answerview.Id = answer.Id;
                            answerview.answer = answer.answer;
                            answerview.userId = answer.userId;
                            answerview.commentId = answer.commentId;
                            commentview.answers.Add(answerview);
                        }
                    }
                    postview.commentViews.Add(commentview);
                }
            }
            return Ok(postview);
        }
        [Authorize]
        [HttpPost, Route("Create")]
        public async Task<ActionResult> CreatePost(PostRequest postRequest)
        {
            Posts post = new Posts();
            post.Id = 0;
            post.title = postRequest.title;
            post.description = postRequest.description;
            ;
            if (postRequest.images != null)
            {
                foreach (var imageview in postRequest.images)
                {
                    var image = new Image();
                    image.Id = imageview.Id;
                    image.Description = imageview.Description;
                    await image.CreateImage(imageview.image);
                    post.images.Add(image);
                }

            }
            post.user = await this.userServices.FindById(postRequest.userId);
            post.userId = post.user.Id;
            await this.postServices.Save(post);
            return Ok("Salvo com sucesso");
        }
        [Authorize]
        [HttpDelete, Route("DeleteById")]
        public async Task<ActionResult> DeletePostById(int postId)
        {
            Posts post = await this.postServices.FindById(postId);
            await this.postServices.Delete(post);
            return Ok();
        }
        [Authorize]
        [HttpPost, Route("AddComment")]
        public async Task<ActionResult> AddComent(CommentRequest commentRequest)
        {
            Posts post = await this.postServices.FindById(commentRequest.postId);
            Comment comment = new Comment();
            comment.Id = 0;
            comment.comment = commentRequest.comment;
            comment.user = await this.userServices.FindById(commentRequest.userId);
            comment.post = await this.postServices.FindById(post.Id);
            post.comments.Add(comment);
            await this.postServices.Save(post);
            return Ok();
        }
        [Authorize]
        [HttpPut, Route("UpdateComment")]
        public async Task<ActionResult> UpdateComment(CommentRequest commentRequest)
        {
            Comment comment = await this.commentServices.FindById(commentRequest.Id);
            comment.comment = commentRequest.comment;
            await this.commentServices.Save(comment);
            return Ok("Comentário atualizado com sucesso!");
        }
        [Authorize]
        [HttpDelete, Route("DeleteComment")]
        public async Task<ActionResult> DeleteComment(CommentRequest commentRequest)
        {
            Comment comment = await this.commentServices.FindById(commentRequest.Id);
            await this.commentServices.Delete(comment);
            return Ok("Comentário deletado com sucesso!");
        }

        [Authorize]
        [HttpPost, Route("AddAnswer")]
        public async Task<ActionResult> AddAnswer(AnswerRequest answerRequest)
        {
            Comment comment = await this.commentServices.FindById(answerRequest.commentId);
            Answer answer = new Answer();
            answer.Id = 0;
            answer.answer = answerRequest.answer;
            answer.user = await this.userServices.FindById(answerRequest.userId);
            answer.comment = await this.commentServices.FindById(answerRequest.commentId);
            comment.answers.Add(answer);
            await this.commentServices.Save(comment);
            return Ok("Salvo com sucesso!");
        }
        [Authorize]
        [HttpPut, Route("UpdateAnswer")]
        public async Task<ActionResult> UpdateAnswer(AnswerRequest answerRequest)
        {
            Answer answer = await this.answerServices.FindById(answerRequest.Id);
            answer.answer = answerRequest.answer;
            await this.answerServices.Save(answer);
            return Ok("O Comentário foi atualizado com sucesso!");
        }
        [Authorize]
        [HttpDelete, Route("DeleteAnswer")]
        public async Task<ActionResult> DeleteAnswer(AnswerRequest answerRequest)
        {
            Answer answer = await this.answerServices.FindById(answerRequest.Id);
            await this.answerServices.Delete(answer);
            return Ok("Comentário deletado com sucesso");
        }

    }
}
