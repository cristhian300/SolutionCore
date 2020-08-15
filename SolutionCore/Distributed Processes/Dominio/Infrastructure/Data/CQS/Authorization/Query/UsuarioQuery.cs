using SolutionCore.Infrastructure.Data.Context;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SolutionCore.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Arch.EntityFrameworkCore.UnitOfWork;
using SolutionCore.Infrastructure.Transport.Core.Authorization.QueryEntity;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Result;
using System.Collections.Immutable;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Parameter;

namespace SolutionCore.Infrastructure.Data.CQS.Authorization.Query
{
    public class UsuarioQuery: IUsuarioQuery
    {

         private readonly IUnitOfWork<CoreContext> _CoreContext;

        //private  CoreContext _CoreContext;

        public UsuarioQuery(IUnitOfWork<CoreContext> CoreContext)
        {
            _CoreContext = CoreContext;
        }

        public UsuarioResult GetUsuario(UsuarioParameter parameter) {


            var _usuario = (from u in _CoreContext.DbContext.Usuarios
                            where u.UsuarioId == parameter.UsuarioId

                            select new UsuarioQueryEntity {
                               UsuarioId=u.UsuarioId,
                               NombreCompleto=  u.NombreCompleto
                           }).FirstOrDefault();

             return new UsuarioResult { usuario = _usuario };
        }
        
      
    }
}
