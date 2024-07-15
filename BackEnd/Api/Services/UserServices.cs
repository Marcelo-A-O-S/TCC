using System.Linq.Expressions;
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

        public async Task<List<User>> FindAll()
        {
            return await this.repository.List();
        }

        public async Task<User> FindBy(Expression<Func<User, bool>> predicate)
        {
            return await this.repository.FindBy(predicate);
        }

        public async Task<User> FindById(int Id)
        {
            return await this.repository.GetById(Id);
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await this.repository.FindBy(x => x.email == email);
            return user;
        }

        public async Task<List<User>> List()
        {
            return await this.repository.List();
        }

        public async Task<List<User>> ListDescendingBy<TKey>(Expression<Func<User, TKey>> predicate)
        {
            return await this.repository.ListDescendingBy<TKey>(predicate);
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

        public async Task Update(User entidade)
        {
            await this.repository.Update(entidade);
        }

        public async Task<bool> VerifyUserExistsByEmail(string email)
        {
            var result = await this.repository.VerifyExists(x=> x.email == email);
            return result;
        }
    }
}
