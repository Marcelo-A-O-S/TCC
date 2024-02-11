using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IAnswerServices : IServices<Answer>
    {
        Task<Answer> FindByUserId(int userId);
        Task<Answer> FindByCommentId(int commentId);
    }
}
