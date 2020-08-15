using SolutionCore.Contract;
using SolutionCore.Infrastructure.Data.CQS.Authorization.Query;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Parameter;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Result;
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

        public UsuarioResult GetUsuario(UsuarioParameter parameter)
        {
            return _IUsuarioQuery.GetUsuario(parameter);
        }
    }
}
