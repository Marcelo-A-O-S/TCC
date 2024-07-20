using Api.Generics.Interfaces;
using Api.Models;
using Api.ViewModel;

namespace Api.Repositories.Interfaces
{
    public interface IPostRepository : IGenerics<Posts>
    {
        Task<Posts> GetPostById(int id);
        Task<List<Posts>> GetAllPostsByUserId(int userId);

        Task<List<Posts>> GetAllPostsDescendingByUserId(int userId);

        Task<List<Posts>> GetAllPosts();
    }
}
