using Api.Services.Interfaces;
using Api.Models;

namespace Api.Services
{
    public class InitializeUsers : IInitializeUsers
    {
        private readonly IUserServices userServices;

        public InitializeUsers(IUserServices userServices)
        {
            this.userServices = userServices;
        }
        public async Task createUsers()
        {
            if(await this.userServices.GetByEmail("usuario@usuario.com.br") == null)
            {
                var user = new User();
                user.username = "usuario";
                user.password = "123";
                user.email = "usuario@usuario.com.br";
                await this.userServices.Save(user);
            }
        }
    }
}
