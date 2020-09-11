

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Arch.EntityFrameworkCore.UnitOfWork;
using SolutionCore.Infrastructure.Transport.Core.Authorization.QueryEntity;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Result;
using System.Collections.Immutable;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Parameter;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Request;
using SolutionCore.Distributed_Processes.Dominio.Infrastructure.Data.Context;

namespace SolutionCore.Infrastructure.Data.CQS.Authorization.Query
{
    public class UsuarioQuery: IUsuarioQuery
    {

        private readonly IUnitOfWork<CoreContext> _CoreContext;

        //private  CoreContext _CoreContext;

        public UsuarioQuery(IUnitOfWork<CoreContext> CoreContext)
        //public UsuarioQuery(CoreContext CoreContext)
        {
            _CoreContext = CoreContext;
        }

      


      public  UsuarioResponse GetUsuario(UsuarioRequest parameter)
        {
            var _usuario = (from u in _CoreContext.DbContext.Usuarios
                                //var _usuario = (from u in _CoreContext .Usuarios
                            where u.UsuarioId == parameter.UsuarioId

                            select new UsuarioQueryEntity
                            {
                                UsuarioId = u.UsuarioId,
                                NombreCompleto = u.NombreCompleto,
                                Credencial=u.Credencial

                            }).FirstOrDefault();

            return new UsuarioResponse { usuario = _usuario };
        }


        public ListUsuarioResponse ListUsuario(ListUsuarioRequest parameter)
        {
            var _usuario = (from u in _CoreContext.DbContext.Usuarios
                               join  r in  _CoreContext.DbContext.RolesUsers
                               on u.RoleId equals r.RoleId
                            orderby r.RoleId   
                            where r.Deleted==false 
                            //&& u.Credencial == parameter.Credencial
                             
                            select new ListUsuarioQueryEntity
                            {
                                UsuarioId = u.UsuarioId,
                                NombreCompleto = u.NombreCompleto,
                                Rol = r.Description,
                                Credencial=u.Credencial,
                                RoleId=u.RoleId,
                                Deleted  =u.Deleted
                            }).ToList();

            return new ListUsuarioResponse { ListUsuarios = _usuario };
        }


    }
}
