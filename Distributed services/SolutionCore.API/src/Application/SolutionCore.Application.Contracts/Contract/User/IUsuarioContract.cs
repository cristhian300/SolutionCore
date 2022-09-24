
using SolutionCore.Infrastructure.Transport.Core.Authorization.Request;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Contract
{
   public  interface IUsuarioContract
    {
         
            Task<UsuarioResponse> GetUsuario(UsuarioRequest parameter);

           Task<ListUsuarioResponse> ListUsuario(ListUsuarioRequest parameter);

              Task<ListRolesResponse> ListRoles(ListRolesRequest parameter);

        Task<AddUsuarioResponse> AddUsuario(AddUsuarioRequest parameter);

        Task<UpdateUsuarioResponse> UpdateUsuario(UpdateUsuarioRequest parameter);
    }
}
