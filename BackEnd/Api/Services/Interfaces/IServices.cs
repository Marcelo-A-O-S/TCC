using System.Linq.Expressions;

namespace Api.Services.Interfaces
{
    public interface IServices<T>
    {
        Task Save(T entidade);
        Task DeleteById(int Id);
        Task Delete(T entidade);
        Task Update(T entidade);
        Task<T> FindById(int Id);
        Task<T> FindBy(Expression<Func<T, bool>> predicate);
        Task<List<T>> FindAll();
        Task<List<T>> List();

    }
}
