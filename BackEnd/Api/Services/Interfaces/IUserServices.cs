using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IUserServices
    {
        Task Save(User user);
        Task Delete(User user);
        Task DeleteById(int id);
        Task<bool> VerifyUserExistsByEmail(string email);
        Task<User> GetByEmail(string email);
    }
}
