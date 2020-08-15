using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Parameter;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Infrastructure.Data.CQS.Authorization.Query
{
  public  interface IUsuarioQuery
    {
        public UsuarioResult GetUsuario(UsuarioParameter parameter);
    }
}
