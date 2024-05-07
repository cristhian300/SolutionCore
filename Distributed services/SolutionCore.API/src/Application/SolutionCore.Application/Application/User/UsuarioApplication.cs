
using SolutionCore.Contract;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Request;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;
using SolutionCore.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Distributed_Processes.Dominio.Application
{
    public class UsuarioApplication : IUsuarioContract
    {


        private IUsuarioQuery _IUsuarioQuery;
        public UsuarioApplication(IUsuarioQuery  IUsuarioQuery)
        {
            _IUsuarioQuery = IUsuarioQuery;
        }

        public    Task<UsuarioResponse> GetUsuario(UsuarioRequest parameter) 
        {
            return   Task.FromResult( _IUsuarioQuery.GetUsuario(parameter));
        }

        public Task<ListUsuarioResponse> ListUsuario(ListUsuarioRequest parameter)
        {
            return Task.FromResult(_IUsuarioQuery.ListUsuario(parameter));
        }

        
        public Task<ListRolesResponse> ListRoles(ListRolesRequest parameter)
        {
            return Task.FromResult(_IUsuarioQuery.ListRoles(parameter));
        }

        public Task<AddUsuarioResponse> AddUsuario(AddUsuarioRequest parameter)
        {
            return Task.FromResult(_IUsuarioQuery.AddUsuario(parameter));
        }

        public Task<UpdateUsuarioResponse> UpdateUsuario(UpdateUsuarioRequest parameter)
        {
            return Task.FromResult(_IUsuarioQuery.UpdateUsuario(parameter));
        }


}
}
