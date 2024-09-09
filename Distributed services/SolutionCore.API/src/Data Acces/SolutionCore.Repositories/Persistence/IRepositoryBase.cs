using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Repositories.Persistence
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {



        Task<ICollection<TEntity>> GetAllAsync();

        Task<ICollection<TEntity>> GetAllWhereAsync(Expression<Func<TEntity, bool>> predicate);

        //Task<ICollection<TEntity>> GetAsync<TKey>(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity?> GetAsync(object id);



        void InsertAsync(TEntity entity);
        void DeleteAsync(int id);

        Task<bool> UpdateAsync(TEntity entity, object id);

        public TEntity MyEntity { get; }
    }
}
