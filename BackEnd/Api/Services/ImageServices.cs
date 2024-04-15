using System.Linq.Expressions;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;

namespace Api.Services
{
    public class ImageServices : IImageServices
    {
        private readonly IImageRepository imageRepository;

        public ImageServices(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }
        public async Task Delete(Image entidade)
        {
            await this.imageRepository.Delete(entidade);
        }

        public async Task DeleteById(int Id)
        {
            await this.imageRepository.DeleteById(Id);
        }

        public async Task<List<Image>> FindAll()
        {
            return await this.imageRepository.List();
        }

        public async Task<Image> FindBy(Expression<Func<Image, bool>> predicate)
        {
            return await this.imageRepository.FindBy(predicate);
        }

        public async Task<Image> FindById(int Id)
        {
            return await this.imageRepository.GetById(Id);
        }

        public async Task<List<Image>> FindImagesByPostId(int PostId)
        {
            return await this.imageRepository.FindAllBy(x=> x.postsId == PostId);
        }

        public async Task<List<Image>> List()
        {
            return await this.imageRepository.List();
        }

        public async Task Save(Image entidade)
        {
            if(entidade.Id == 0)
            {
                await this.imageRepository.Save(entidade);
            }
            else
            {
                await this.imageRepository.Update(entidade);
            }
        }

        public async Task Update(Image entidade)
        {
            await this.imageRepository.Update(entidade);
        }
    }
}
