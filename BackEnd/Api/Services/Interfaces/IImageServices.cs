using Api.Models;

namespace Api.Services.Interfaces
{
    public interface IImageServices : IServices<Image>
    {
        Task<List<Image>> FindImagesByPostId(int PostId);
    }
}
