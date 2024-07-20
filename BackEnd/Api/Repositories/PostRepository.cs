using Api.Context;
using Api.Generics;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class PostRepository: Generics<Posts>, IPostRepository
    {
        private readonly AppDbContext context;
        private readonly DbContextOptions<AppDbContext> options;

        public PostRepository(DbContextOptions<AppDbContext> options, AppDbContext context) : base(options, context)
        {
            this.options = options;
            this.context = context;
        }

        public async Task<List<Posts>> GetAllPosts()
        {
            var posts = await this.context.posts
            .Include(imagesPost => imagesPost.images)
            .Include(userPost => userPost.user)
            .Include(commentsPost => commentsPost.comments)
                .ThenInclude(comments=> comments.answers)
            .OrderByDescending(modelPost => modelPost.dateCreate)
            .ToListAsync();
            return posts;
        }

        public async Task<List<Posts>> GetAllPostsByUserId(int userId)
        {
            var posts = await this.context.posts
            .Include(imagesPost => imagesPost.images)
            .Include(userPost => userPost.user)
            .Include(commentsPost => commentsPost.comments)
                .ThenInclude(comments=> comments.answers)
            .Where(modelPost => modelPost.userId == userId)
            .OrderByDescending(modelPost => modelPost.dateCreate)
            .ToListAsync();
            return posts;
        }

        public async Task<List<Posts>> GetAllPostsDescendingByUserId(int userId)
        {
            var posts = await this.context.posts
            .Include(imagesPost => imagesPost.images)
            .Include(userPost => userPost.user)
            .Include(commentsPost => commentsPost.comments)
                .ThenInclude(comments=> comments.answers)
            .Where(modelPost => modelPost.userId == userId)
            .OrderByDescending(modelPost => modelPost.dateCreate)
            .ToListAsync();
            return posts;
            
        }

        public async Task<Posts> GetPostById(int id)
        {
            var post = await this.context.posts
            .Include(imagesPost => imagesPost.images)
            .Include(userPost => userPost.user)
            .Include(commentsPost => commentsPost.comments)
                .ThenInclude(comments=> comments.answers)
            .FirstOrDefaultAsync(modelpost => modelpost.Id == id);
            if(post == null){
                return null;
            }
            return post;
        }
    }
}
