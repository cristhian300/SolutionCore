
using SolutionCore.Application.DTO.Authorization.Request;
using SolutionCore.Application.DTO.Authorization.Response;
using SolutionCore.Application.Interface.Contract.User;
using SolutionCore.Repositories.Persistence;

namespace SolutionCore.Distributed_Processes.Dominio.Application
{
    public class UsuarioApplication : IUsuarioApplication
    {


        private IUsuarioRepository _IUsuarioQuery;
        public UsuarioApplication(IUsuarioRepository  IUsuarioQuery)
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
