using Api.Context;
using Api.Generics.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq.Expressions;

namespace Api.Generics
{
    public class Generics<T> : IGenerics<T> where T : class
    {
        private readonly AppDbContext context;
        private readonly DbContextOptions<AppDbContext> options;
        public Generics(DbContextOptions<AppDbContext> options, AppDbContext context)
        {
            this.options = options;
            this.context = context;
        }

        public async Task Delete(T entity)
        {
            try
            {
                this.context.Set<T>().Remove(entity);
                await context.SaveChangesAsync();

            }
            catch(Exception err)
            {
                Console.WriteLine(err.Message);
            }
            
        }

        public async Task DeleteById(int id)
        {
            try
            {
                var entity = await this.context.Set<T>().FindAsync(id);
                if (entity != null)
                {
                    await this.Delete(entity);
                }
            }
            catch (Exception err)
            {
                Console.WriteLine(err.Message);
            }
        }

        public async Task<List<T>> FindAllBy(Expression<Func<T, bool>> predicate)
        {
            return await this.context.Set<T>().Where(predicate).ToListAsync(); 
        }

        public async Task<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return await this.context.Set<T>().Where(predicate).FirstOrDefaultAsync();
            
        }
        public async Task<T> GetById(int id)
        {
            var entity = await this.context.Set<T>().FindAsync(id);
            return entity;

        }

        public async Task<List<T>> List()
        {
            var list = await this.context.Set<T>().ToListAsync();
            return list;

        }

        public async Task Save(T entity)
        {
            try
            {
                await this.context.Set<T>().AddAsync(entity);
                await this.context.SaveChangesAsync();

            }
            catch(Exception err)
            {
                Console.WriteLine(err.Message);
            }
            
        }

        public async Task Update(T entity)
        {
            try
            {
                this.context.Set<T>().Update(entity);
                await this.context.SaveChangesAsync();
            }
            catch (Exception err)
            {
                Console.WriteLine(err.Message);
            }
            
        }

        public async Task<bool> VerifyExists(Expression<Func<T, bool>> predicate)
        {
            
            var exists = await this.context.Set<T>().Where(predicate).FirstOrDefaultAsync();
            if (exists != null)
            {
                return true;
            }
            return false;
        }
    }
}
