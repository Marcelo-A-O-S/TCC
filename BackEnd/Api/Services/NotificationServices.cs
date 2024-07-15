using System.Linq.Expressions;
using Api.Models;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;

namespace Api.Services
{
    public class NotificationServices : INotificationServices
    {
        private readonly INotificationRepository notificationRepository;

        public NotificationServices(INotificationRepository notificationRepository)
        {
            this.notificationRepository = notificationRepository;
        }

        public async Task Delete(Notification entidade)
        {
            await this.notificationRepository.Delete(entidade);
        }

        public async Task DeleteById(int Id)
        {
            await this.notificationRepository.DeleteById(Id);
        }

        public async Task<List<Notification>> FindAll()
        {
            var list = await this.notificationRepository.List();
            return list;
        }

        public async Task<Notification> FindBy(Expression<Func<Notification, bool>> predicate)
        {
            return await this.notificationRepository.FindBy(predicate);
        }

        public async Task<Notification> FindById(int Id)
        {
            return await this.notificationRepository.FindBy(notification => notification.Id == Id);
        }

        public async Task<List<Notification>> FindByUserIdDescending(int userId)
        {
            return await this.notificationRepository.FindAllAndDescendingBy(search => search.userId == userId, descending => descending.Id);
        }

        public async Task<List<Notification>> List()
        {
            var list = await this.notificationRepository.List();
            return list;
        }

        public async Task<List<Notification>> ListDescendingBy<TKey>(Expression<Func<Notification, TKey>> predicate)
        {
            return await this.notificationRepository.ListDescendingBy<TKey>(predicate);
        }

        public async Task Save(Notification entidade)
        {
            if(entidade.Id == 0){
                await this.notificationRepository.Save(entidade);
            }else{
                await this.notificationRepository.Update(entidade);
            }
        }

        public async Task Update(Notification entidade)
        {
            await this.notificationRepository.Update(entidade);
        }
    }
}