using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Parameter;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Result;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Request;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Repositories
{
    public interface IUsuarioQuery
    {
        UsuarioResponse GetUsuario(UsuarioRequest parameter);
        ListUsuarioResponse ListUsuario(ListUsuarioRequest parameter);

        ListRolesResponse ListRoles(ListRolesRequest parameter);

        AddUsuarioResponse AddUsuario(AddUsuarioRequest parameter);

        UpdateUsuarioResponse UpdateUsuario(UpdateUsuarioRequest parameter);
    }
}
