using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;

namespace Api.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository repository;

        public UserServices(IUserRepository repository)
        {
            this.repository = repository;
        }

        public async Task Delete(User user)
        {
            await this.repository.Delete(user);
        }

        public async Task DeleteById(int id)
        {
            await this.repository.DeleteById(id);
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await this.repository.FindBy(x => x.email == email);
            return user;
        }

        public async Task Save(User user)
        {
            try
            {
                if( user.Id == 0)
                {
                    await this.repository.Save(user);
                }
                else
                {
                    await this.repository.Update(user);
                }
            }catch(Exception err)
            {

            }
        }

        public async Task<bool> VerifyUserExistsByEmail(string email)
        {
            var result = await this.repository.VerifyExists(x=> x.email == email);
            return result;
        }
    }
}
