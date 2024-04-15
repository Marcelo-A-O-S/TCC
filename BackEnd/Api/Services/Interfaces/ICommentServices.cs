using Api.Models;

namespace Api.Services.Interfaces
{
    public interface ICommentServices : IServices<Comment>
    {
        Task<Comment> FindyByPostId(int postId);
        Task<List<Comment>> FindyCommentsByPostId(int postId);
        Task<Comment> FindByUserId(int userId);
    }
}
