using SolutionCore.Application.DTO.Authorization.Request;
using SolutionCore.Application.DTO.Authorization.Response;
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
