using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IPostServices
    {
        Task Save(Posts post);
        Task Delete(Posts post);
        Task DeleteById(int Id);
        Task<Posts> FindByUserId(int Userid);
        Task<List<Posts>> GetAll();
    }
}
