using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IPostServices : IServices<Posts>
    {
        Task<List<Posts>> FindByUserId(int Userid);
        
    }
}
