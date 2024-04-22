using System.Linq.Expressions;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;

namespace Api.Services
{
    public class AnswerServices : IAnswerServices
    {
        private readonly IAnswerRepository answerRepository;

        public AnswerServices(IAnswerRepository answerRepository)
        {
            this.answerRepository = answerRepository;
        }
        public async Task Delete(Answer entidade)
        {
            await this.answerRepository.Delete(entidade);
        }

        public async Task DeleteById(int Id)
        {
            await this.answerRepository.DeleteById(Id);
        }

        public async Task<List<Answer>> FindAll()
        {
            return await this.answerRepository.List();
        }

        public async Task<List<Answer>> FindAnswersByCommentId(int commentId)
        {
            return await this.answerRepository.FindAllBy(x=> x.commentId == commentId);
        }

        public async Task<Answer> FindBy(Expression<Func<Answer, bool>> predicate)
        {
            return await this.answerRepository.FindBy(predicate);
        }

        public async Task<Answer> FindByCommentId(int commentId)
        {
            return await this.answerRepository.FindBy(x => x.commentId == commentId);
        }

        public async Task<Answer> FindById(int Id)
        {
            return await this.answerRepository.GetById(Id);
        }

        public async Task<Answer> FindByUserId(int userId)
        {
            return await this.answerRepository.FindBy(x => x.userId == userId);
        }

        public async Task<List<Answer>> List()
        {

            return await this.answerRepository.List();
        }

        public async Task Save(Answer entidade)
        {
            if(entidade.Id == 0)
            {
                await this.answerRepository.Save(entidade);
            }
            else
            {
                await this.answerRepository.Update(entidade);
            }
        }

        public async  Task Update(Answer entidade)
        {
            await this.answerRepository.Update(entidade);
        }
    }
}
