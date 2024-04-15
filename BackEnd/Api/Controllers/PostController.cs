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
        private readonly IImageServices imageServices;

        public PostController(
            IPostServices postServices, 
            IUserServices userServices, 
            ICommentServices commentServices,
            IAnswerServices answerServices,
            IImageServices imageServices
            )
        {
            this.postServices = postServices;
            this.userServices = userServices;
            this.commentServices = commentServices;
            this.answerServices = answerServices;
            this.imageServices = imageServices;
        }
        [Authorize]
        [HttpGet, Route("List")]
        public async Task<ActionResult<List<PostViewModel>>> List()
        {
            var posts = await this.postServices.List();
            var postsViews = new List<PostViewModel>();
            foreach (var item in posts)
            {
                var postview = new PostViewModel();
                postview.Id = item.Id;
                List<Image> images = await this.imageServices.FindImagesByPostId(item.Id);
                if(images.Count > 0)
                {
                    foreach (var image in images)
                    {
                        var imageview = new ImageViewModel();
                        imageview.Id = image.Id;
                        imageview.type = image.type;
                        imageview.Description = image.Description;
                        imageview.image = image.image;
                        imageview.imageGuid = image.imageGuid;
                        postview.imagesViews.Add(imageview);
                    }

                }
                postview.description = item.description;
                postview.dateCreate = item.dateCreate;
                postview.title = item.title;
                postview.userId = item.userId;
                List<Comment> comments  = await this.commentServices.FindyCommentsByPostId(item.Id);
                if(comments.Count > 0)
                {
                    foreach (var comment in comments)
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
            post.images = await this.imageServices.FindImagesByPostId(post.Id);
            if (post.images != null)
            {
                foreach (var image in post.images)
                {
                    var imageview = new ImageViewModel();
                    imageview.Id = image.Id;
                    imageview.Description = image.Description;
                    imageview.imageGuid = image.imageGuid;
                    imageview.image = image.image;
                    imageview.type = image.type;
                    postview.imagesViews.Add(imageview);
                }

            }
            postview.description = post.description;
            postview.dateCreate = post.dateCreate;
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
        public async Task<ActionResult<List<PostViewModel>>> GetPostUserId(int UserId)
        {
            var posts = await this.postServices.FindByUserId(UserId);
            var postsViews = new List<PostViewModel>();
            foreach (var post in posts){
                var postview = new PostViewModel();
                postview.Id = post.Id;
                postview.description = post.description;
                postview.title = post.title;
                postview.userId = post.userId;
                postview.dateCreate = post.dateCreate;
                post.images = await this.imageServices.FindImagesByPostId(post.Id);
                if (post.images.Count > 0)
                {
                    foreach (var image in post.images)
                    {
                        var imageview = new ImageViewModel();
                        imageview.Id = image.Id;
                        imageview.Description = image.Description;
                        imageview.image = image.image;
                        imageview.imageGuid = image.imageGuid;
                        imageview.type = image.type;
                        postview.imagesViews.Add(imageview);
                    }
                }
                post.comments = await this.commentServices.FindyCommentsByPostId(post.Id);
                if (post.comments.Count > 0)
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
                postsViews.Add(postview);
            }
            return Ok(postsViews);
        }
        [Authorize]
        [HttpPost, Route("Create")]
        public async Task<ActionResult> CreatePost(PostRequest postRequest)
        {
            Posts post = new Posts();
            if(postRequest.id == 0){
                post.Id = 0;
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
                try{
                    await this.postServices.Save(post);
                    return Ok("Salvo com sucesso");
                }catch(Exception err){
                    return BadRequest(err.Message);
                }
                
            }else{
                post.Id = postRequest.id;
                post.title = postRequest.title;
                post.description = postRequest.description;
                if (postRequest.images != null)
                {
                    //Responsavel por deletar as ocorrencias deletadas no front end
                    var imagesPost = await this.imageServices.FindImagesByPostId(postRequest.id);
                    for (int i = 0; i < imagesPost.Count; i++){
                        var imagepost = imagesPost[i];
                        var imageview = postRequest.images.Find(x=> x.imageGuid == imagepost.imageGuid);
                        if(imageview == null){
                            await this.imageServices.DeleteById(imagepost.Id);
                        }
                    }
                    //Responsavel por atualizar ou salvar ocorrencias de imagens na lista 
                    foreach (var imageview in postRequest.images){
                        var image = await this.imageServices.FindBy(x=> x.imageGuid == imageview.imageGuid);
                        if(image == null){
                            image = new Image();
                            image.Id = 0;
                            image.Description = imageview.Description;
                            image.type = imageview.type;
                            image.image = imageview.image;
                            image.imageGuid = imageview.imageGuid;
                            image.posts = post;
                            image.postsId = post.Id;
                            await this.imageServices.Save(image);
                            image = await this.imageServices.FindBy(x=> x.imageGuid == imageview.imageGuid);
                        }else{
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
                return Ok("Atualizado com sucesso");
            }
           
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
        public async Task<ActionResult> AddComent(CommentViewModel commentRequest)
        {
            Posts post = await this.postServices.FindById(commentRequest.postId);
            Comment comment = new Comment();
            comment.Id = 0;
            comment.comment = commentRequest.comment;
            var user = await this.userServices.FindById(commentRequest.userId);
            if(user == null){
                return BadRequest("Usuário não encontrado");
            }   
            comment.userId = user.Id; 
            comment.postId = post.Id;
            await this.commentServices.Save(comment);
            return Ok("Comentário salvo com sucesso!");
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
