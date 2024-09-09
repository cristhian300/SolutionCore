using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.FileIO;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Repositories.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Repositories.Repositories
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



        public async Task<ICollection<TEntity>> GetAllAsync()
        {


            return await _context.Set<TEntity>().AsNoTracking().ToListAsync();
        }

        public async Task<ICollection<TEntity>> GetAllWhereAsync(Expression<Func<TEntity, bool>> predicate)
        {

            var query = await _context.Set<TEntity>()
             .Where(predicate)
             .AsNoTracking()
             .ToListAsync();
            return query;
        }


        public async Task<TEntity?> GetAsync(object id)
        {
            return  await _context.Set<TEntity?>().FindAsync(id);
        }

        public void InsertAsync(TEntity entity)
        {
            _context.Set<TEntity>().Attach(entity);
            _context.Entry(entity).State = EntityState.Added;
        }

        public async Task<bool> UpdateAsync(TEntity entity, object id)
        {
          

            var objEntity =  _context.Set<TEntity>().FindAsync(id).Result;
             
            if (objEntity!=null)
            {
                _context.Entry(objEntity).State = EntityState.Detached;
                _context.Entry(entity).State = EntityState.Modified;

                return await Task.FromResult(true) ;
            }
           // _context.Set<TEntity>().Attach(entity);
          return await Task.FromResult(false);


        }

        public void Dispose()
        {
            _context.Dispose();
        }





    }
}
