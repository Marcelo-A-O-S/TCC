using Api.Models;
using Api.Services.Interfaces;

namespace Api.Services
{
    public interface ILikeServices: IServices<Like>
    {
        Task<Like> FindByGuid(string guid);
        Task<List<Like>> GetAllLikebyPostId(int postId);

    }
}