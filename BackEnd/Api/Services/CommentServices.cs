using System.Linq.Expressions;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;

namespace Api.Services
{
    public class CommentServices : ICommentServices
    {
        private readonly ICommentRepository commentRepository;

        public CommentServices(ICommentRepository commentRepository)
        {
            this.commentRepository = commentRepository;
        }
        public async Task Delete(Comment entidade)
        {
            await this.commentRepository.Delete(entidade);
        }

        public async Task DeleteById(int Id)
        {
            await this.commentRepository.DeleteById(Id);
        }

        public async Task<List<Comment>> FindAll()
        {
            return await this.commentRepository.List();
        }

        public async Task<Comment> FindBy(Expression<Func<Comment, bool>> predicate)
        {
            return await this.commentRepository.FindBy(predicate);
        }

        public async Task<Comment> FindByGuid(string guid)
        {
           return await this.commentRepository.FindBy(answer => answer.guid == guid);
        }

        public async Task<Comment> FindById(int Id)
        {
            return await this.commentRepository.GetById(Id);
        }

        public async Task<Comment> FindByUserId(int userId)
        {
            return await this.commentRepository.FindBy(x => x.userId == userId);
        }

        public async Task<Comment> FindyByPostId(int postId)
        {
            return await this.commentRepository.FindBy(x => x.postId == postId);
        }

        public async Task<List<Comment>> FindyCommentsByPostId(int postId)
        {
            return await this.commentRepository.FindAllBy(x=> x.postId == postId);
        }

        public async Task<List<Comment>> List()
        {
            return await this.commentRepository.List();
        }

        public async Task<List<Comment>> ListDescendingBy<TKey>(Expression<Func<Comment, TKey>> predicate)
        {
            return await this.commentRepository.ListDescendingBy<TKey>(predicate);
        }

        public async Task Save(Comment entidade)
        {
            if(entidade.Id == 0)
            {
                await this.commentRepository.Save(entidade);
            }
            else
            {
                await this.commentRepository.Update(entidade);
            }
        }

        public async Task Update(Comment entidade)
        {
            await this.commentRepository.Update(entidade);
        }
    }
}
