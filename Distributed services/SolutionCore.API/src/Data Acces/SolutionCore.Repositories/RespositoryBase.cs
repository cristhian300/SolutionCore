using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.FileIO;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Repositories
{
    public class RespositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {

        CoreContext _context;
        public RespositoryBase(CoreContext context)
        {
            _context = context;
        }

        public TEntity MyEntity => throw new NotImplementedException();

        public void DeleteAsync(int id)
        {
            var objDeleted = _context.Set<TEntity>().Find(id);
            _context.Set<TEntity>().Remove(objDeleted);
        }

        public Task<ICollection<TEntity>> GetAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {

            var query = await _context.Set<TEntity>()
                 .AsNoTracking()
                 .ToListAsync();
            return query;
        }

        public async Task<TEntity?> GetAsync(object id)
        {
            return _context.Set<TEntity?>().Find(id);
        }

        public void InsertAsync(TEntity entity)
        {
            _context.Set<TEntity>().Attach(entity);
            _context.Entry(entity).State = EntityState.Added;
        }

        public void UpdateAsync(TEntity entity)
        {
            _context.Set<TEntity>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;


        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
