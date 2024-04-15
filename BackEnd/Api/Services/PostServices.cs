using System.Linq.Expressions;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;

namespace Api.Services
{
    public class PostServices : IPostServices
    {
        private readonly IPostRepository postRepository;

        public PostServices(IPostRepository postRepository)
        {
            this.postRepository = postRepository;
        }
        public async Task Delete(Posts entidade)
        {
            await this.postRepository.Delete(entidade);
        }

        public async Task DeleteById(int Id)
        {
            await this.postRepository.DeleteById(Id);
        }

        public async Task<List<Posts>> FindAll()
        {
            return await this.postRepository.List();
        }

        public async Task<Posts> FindBy(Expression<Func<Posts, bool>> predicate)
        {
            return await this.postRepository.FindBy(predicate);
        }

        public async Task<Posts> FindById(int Id)
        {
            return await this.postRepository.GetById(Id);
        }

        public async Task<List<Posts>> FindByUserId(int Userid)
        {
            return await this.postRepository.FindAllBy(x=> x.userId == Userid);
        }
        public async Task<List<Posts>> List()
        {
            return await this.postRepository.List();
        }

        public async Task Save(Posts entidade)
        {
            if(entidade.Id == 0)
            {
                await this.postRepository.Save(entidade);
            }
            else
            {
                await this.postRepository.Update(entidade);
            }
        }

        public async Task Update(Posts entidade)
        {
            await this.postRepository.Update(entidade);
        }
    }
}
