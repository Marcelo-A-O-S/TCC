using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IJwtBearerServices
    {
        Task<string> GenerateJwtToken(User user);
    }
}
