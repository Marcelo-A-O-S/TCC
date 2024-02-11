using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IPostServices : IServices<Posts>
    {
        Task<Posts> FindByUserId(int Userid);
        
    }
}
