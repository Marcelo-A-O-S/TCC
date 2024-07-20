using Api.Models;
using Api.ViewModel;

namespace Api.Services.Interfaces
{
    public interface IPostServices : IServices<Posts>
    {
        Task<List<Posts>> FindByUserId(int Userid);

        Task<List<Posts>> FindByUserIdDescending(int userId);

        Task<List<Posts>> ListDescendingByDateCreate(DateTime datecreate);

        Task<List<Posts>> ListDescending();

        Task<List<PostViewModel>> GetAllPostViewModelDescendingByUserId(int userId);

        Task<PostViewModel> GetPostViewModelById(int id);

        Task<List<PostViewModel>> GetPostViews();
        
    }
}
