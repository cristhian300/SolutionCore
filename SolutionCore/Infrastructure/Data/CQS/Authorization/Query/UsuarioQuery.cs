using SolutionCore.Infrastructure.Data.Context;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SolutionCore.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Arch.EntityFrameworkCore.UnitOfWork;

namespace SolutionCore.Infrastructure.Data.CQS.Authorization.Query
{
    public class UsuarioQuery
    {

        private readonly IUnitOfWork<CoreContext> _CoreContext;

        //private  CoreContext _CoreContext;

        public UsuarioQuery(IUnitOfWork<CoreContext> CoreContext)
        {
            _CoreContext = CoreContext;
        }

        public IQueryable GetUsuario( ) {

          
            var  _usuario = (from u in _CoreContext.DbContext.Usuarios
                           
                           select new {
                               u.UsuarioId,
                               u.NombreCompleto
                           });

             return _usuario;
        }
        
      
    }
}
