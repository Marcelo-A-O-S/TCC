using System.Linq.Expressions;

namespace Api.Generics.Interfaces
{
    public interface IGenerics<T> where T : class
    {
        Task Save(T entity);
        Task Update(T entity);
        Task DeleteById(int id);
        Task Delete(T entity);
        Task<List<T>> List();
        Task<T> GetById(int id);
        Task<T> FindBy(Expression<Func<T, bool>> predicate);
        Task<bool> VerifyExists(Expression<Func<T, bool>> predicate);
        Task<List<T>> FindAllBy(Expression<Func<T, bool>> predicate);  
    }
}
