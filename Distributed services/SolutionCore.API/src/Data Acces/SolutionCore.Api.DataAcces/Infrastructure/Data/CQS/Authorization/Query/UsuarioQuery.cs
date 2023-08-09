

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
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
using System.Runtime.InteropServices.WindowsRuntime;

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
                                //Credencial=u.Credencial

                            }).FirstOrDefault();

            return new UsuarioResponse { usuario = _usuario };
        }


        public ListUsuarioResponse ListUsuario(ListUsuarioRequest parameter)
        {

            try
            {
                 var _usuario = (from u in _CoreContext.DbContext.Usuarios
                            join r in _CoreContext.DbContext.RolesUsers
                            on u.RoleId equals r.RoleId
                            orderby r.RoleId
                            where r.Deleted == false
                            //&& u.Credencial == parameter.Credencial

                            select new ListUsuarioQueryEntity
                            {
                                UsuarioId = u.UsuarioId,
                                NombreCompleto = u.NombreCompleto,
                                Rol = r.Description,
                                //Credencial=u.Credencial,
                                RoleId = u.RoleId,
                                Deleted = u.Deleted,
                                Clave = u.Clave
                            }
                                          ).ToList();
                return new ListUsuarioResponse { ListUsuarios = _usuario };
            }
            catch( Exception ex ) 
            {
               
                return null;
            }
          

            
        }

        public ListRolesResponse ListRoles(ListRolesRequest parameter)
        {
            var roles = ( 
                            from r in _CoreContext.DbContext.RolesUsers
                           
                            where r.Deleted == false
                           

                            select new RolesQueryEntity
                            {
                                Value =r.RoleId,
                                Description=r.Description
                            }).ToList();

            return new ListRolesResponse { ListRoles = roles };
        }




        public AddUsuarioResponse AddUsuario(AddUsuarioRequest parameter)
        {

            Usuario usuario = new Usuario
            {
                NombreCompleto = parameter.NombreCompleto,
                //Credencial = parameter.Credencial,
                Clave=parameter.Clave,
                RoleId=parameter.RoleId,
                Deleted=false


             };

            _CoreContext.DbContext.Usuarios.Add(usuario);
            _CoreContext.DbContext.SaveChanges();

            return new AddUsuarioResponse {
            UsuarioId = usuario.UsuarioId
            };
        }


        public UpdateUsuarioResponse UpdateUsuario(UpdateUsuarioRequest parameter)
        {

            Usuario usuario = new Usuario
            {
                UsuarioId = parameter.UsuarioId,
                NombreCompleto = parameter.NombreCompleto,
                //Credencial = parameter.Credencial,
                Clave = parameter.Clave,
                RoleId = parameter.RoleId,
                Deleted = false


            };

            _CoreContext.DbContext.Usuarios.Update(usuario);
            _CoreContext.DbContext.SaveChanges();

            return new UpdateUsuarioResponse
            {
                //UsuarioId = usuario.UsuarioId
            };
        }


    }
}
