using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Repositories
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {

        Task<ICollection<TEntity>> GetAsync();

        Task<ICollection<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate);

        //Task<ICollection<TEntity>> GetAsync<TKey>(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity?> GetAsync(object id);

        void InsertAsync(TEntity entity);
        void DeleteAsync(int id);

        void UpdateAsync(TEntity entity);

        public TEntity MyEntity { get; }
    }
}
