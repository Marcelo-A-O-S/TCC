using System.Linq.Expressions;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;
using Api.ViewModel;

namespace Api.Services
{
    public class PostServices : IPostServices
    {
        private readonly IPostRepository postRepository;

        public PostServices(IPostRepository postRepository)
        {
            this.postRepository = postRepository;
        }
        public async Task Delete(Posts entidade)
        {
            await this.postRepository.Delete(entidade);
        }

        public async Task DeleteById(int Id)
        {
            await this.postRepository.DeleteById(Id);
        }

        public async Task<List<Posts>> FindAll()
        {
            return await this.postRepository.List();
        }

        public async Task<Posts> FindBy(Expression<Func<Posts, bool>> predicate)
        {
            return await this.postRepository.FindBy(predicate);
        }

        public async Task<Posts> FindByGuid(string guid)
        {
            return await this.postRepository.FindBy(post => post.guid == guid);
        }

        public async Task<Posts> FindById(int Id)
        {
            return await this.postRepository.GetById(Id);
        }

        public async Task<List<Posts>> FindByUserId(int Userid)
        {
            return await this.postRepository.FindAllBy(x=> x.userId == Userid);
        }

        public async Task<List<Posts>> FindByUserIdDescending(int userId)
        {
            return await this.postRepository.FindAllAndDescendingBy(search => search.userId == userId, post=> post.dateCreate);
        }

        public async Task<List<PostViewModel>> GetAllPostViewModelDescendingByUserId(int userId)
        {
            var posts = await this.postRepository.GetAllPostsDescendingByUserId(userId);
            var postViewModels = posts.Select(post => 
            { 
                if(post == null){
                    return null;
                }
                var postview = new PostViewModel();
                postview.Id = post.Id;
                postview.description = post.description;
                postview.dateCreate = post.dateCreate;
                postview.title = post.title;
                postview.guid = post.guid;
                if(post.user != null){
                    postview.userview.email = post.user.email;
                    postview.userview.username = post.user.username;
                    postview.userview.Id = post.user.Id;
                    postview.userview.token = "";
                }
                if(post.likes != null){
                    postview.likeViews = post.likes.Select(like => new LikeViewModel{
                        guid= like.guid,
                        Id= like.Id,
                        postId= like.postId,
                        userId = like.userId
                    }).ToList();
                }
                if(post.images != null){
                    postview.imagesViews = post.images.Select(image => new ImageViewModel{
                        Description = image.Description,
                        Id = image.Id,
                        image = image.image,
                        imageGuid = image.imageGuid,
                    }).ToList();
                }
                if(post.comments != null){
                    postview.commentViews = post.comments.Select(comment =>{
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
                return postview;
            }).ToList();
            return postViewModels;
        }

        public async Task<PostViewModel> GetPostViewModelById(int id)
        {
            var post = await this.postRepository.GetPostById(id);
            var postview = new PostViewModel();
            if(post != null){
                postview.Id = post.Id;
                postview.description = post.description;
                postview.dateCreate = post.dateCreate;
                postview.title = post.title;
                postview.guid = post.guid;
                if(post.user != null){
                    postview.userview.email = post.user.email;
                    postview.userview.username = post.user.username;
                    postview.userview.Id = post.user.Id;
                    postview.userview.token = "";
                }
                if(post.likes != null){
                    postview.likeViews = post.likes.Select(like => new LikeViewModel{
                        guid= like.guid,
                        Id= like.Id,
                        postId= like.postId,
                        userId = like.userId
                    }).ToList();
                }
                if(post.images != null){
                    postview.imagesViews = post.images.Select(image => new ImageViewModel{
                        Description = image.Description,
                        Id = image.Id,
                        image = image.image,
                        imageGuid = image.imageGuid,
                    }).ToList();
                }
                if(post.comments != null){
                    postview.commentViews = post.comments.Select(comment =>{
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
                };
                return postview;
            }
            return null;
            
        }

        public async Task<List<PostViewModel>> GetPostViews()
        {
            var posts = await this.postRepository.GetAllPosts();
            var postViewModels = posts.Select(post => 
            { 
                if(post == null){
                    return null;
                }
                var postview = new PostViewModel();
                postview.Id = post.Id;
                postview.description = post.description;
                postview.dateCreate = post.dateCreate;
                postview.title = post.title;
                postview.guid = post.guid;
                if(post.user != null){
                    postview.userview.email = post.user.email;
                    postview.userview.username = post.user.username;
                    postview.userview.Id = post.user.Id;
                    postview.userview.token = "";
                }
                if(post.likes != null){
                    postview.likeViews = post.likes.Select(like => new LikeViewModel{
                        guid= like.guid,
                        Id= like.Id,
                        postId= like.postId,
                        userId = like.userId
                    }).ToList();
                }
                if(post.images != null){
                    postview.imagesViews = post.images.Select(image => new ImageViewModel{
                        Description = image.Description,
                        Id = image.Id,
                        image = image.image,
                        imageGuid = image.imageGuid,
                    }).ToList();
                }
                if(post.comments != null){
                    postview.commentViews = post.comments.Select(comment =>{
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
                return postview;
            }).ToList();
            return postViewModels;
        }

        public async Task<List<Posts>> List()
        {
            return await this.postRepository.List();
        }

        public async Task<List<Posts>> ListDescending()
        {
           return await this.postRepository.ListDescendingBy<int>(post => post.Id);
        }

        public async Task<List<Posts>> ListDescendingBy<TKey>(Expression<Func<Posts, TKey>> predicate)
        {
            return await this.postRepository.ListDescendingBy<TKey>(predicate);
        }

        public async Task<List<Posts>> ListDescendingByDateCreate(DateTime datecreate)
        {
            return await this.postRepository.ListDescendingBy<DateTime>(post => post.dateCreate);
        }

        public async Task Save(Posts entidade)
        {
            if(entidade.Id == 0)
            {
                await this.postRepository.Save(entidade);
            }
            else
            {
                await this.postRepository.Update(entidade);
            }
        }

        public async Task Update(Posts entidade)
        {
            await this.postRepository.Update(entidade);
        }
    }
}
