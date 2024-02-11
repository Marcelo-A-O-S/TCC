using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IUserServices: IServices<User>
    {
        Task<bool> VerifyUserExistsByEmail(string email);
        Task<User> GetByEmail(string email);
    }
}
