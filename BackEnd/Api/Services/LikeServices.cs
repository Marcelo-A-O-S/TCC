using System.Linq.Expressions;
using Api.Models;
using Api.Repositories;

namespace Api.Services
{
    public class LikeServices : ILikeServices
    {
        private readonly ILikeRepository likeRepository;

        public LikeServices(ILikeRepository likeRepository){
            this.likeRepository = likeRepository;
        }
        public async Task Delete(Like entidade)
        {
            await this.likeRepository.Delete(entidade);
        }
        public async Task DeleteById(int Id)
        {
            await this.likeRepository.DeleteById(Id);
        }
        public async Task<List<Like>> FindAll()
        {
            return await this.likeRepository.List();
        }
        public async Task<Like> FindBy(Expression<Func<Like, bool>> predicate)
        {
            return await this.likeRepository.FindBy(predicate);
        }

        public async Task<Like> FindByGuid(string guid)
        {
            return await this.likeRepository.FindBy(x=> x.guid == guid);
        }

        public async Task<Like> FindById(int Id)
        {
            return await this.likeRepository.FindBy(x=> x.Id == Id);
        }

        public async Task<List<Like>> GetAllLikebyPostId(int postId)
        {
            return await this.likeRepository.FindAllBy(x=> x.postId == postId);
        }

        public async Task<List<Like>> List()
        {
            return await this.likeRepository.List();
        }

        public async Task<List<Like>> ListDescendingBy<TKey>(Expression<Func<Like, TKey>> predicate)
        {
            return await this.likeRepository.ListDescendingBy<TKey>(predicate);
            
        }

        public async Task Save(Like entidade)
        {
            if(entidade.Id == 0){
                await this.likeRepository.Save(entidade);
            }else{
                await this.likeRepository.Update(entidade);
            }
        }
        public async Task Update(Like entidade)
        {
            await this.likeRepository.Update(entidade);
        }
    }
}