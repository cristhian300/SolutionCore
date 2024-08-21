
using SolutionCore.Application.DTO.Authorization.Request;
using SolutionCore.Application.DTO.Authorization.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Repositories
{
    public interface IUsuarioRepository
    {
        UsuarioResponse GetUsuario(UsuarioRequest parameter);
        ListUsuarioResponse ListUsuario(ListUsuarioRequest parameter);

        ListRolesResponse ListRoles(ListRolesRequest parameter);

        AddUsuarioResponse AddUsuario(AddUsuarioRequest parameter);

        UpdateUsuarioResponse UpdateUsuario(UpdateUsuarioRequest parameter);
    }
}
