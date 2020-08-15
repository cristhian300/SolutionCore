using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Parameter;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Contract
{
   public  interface IUsuarioContract
    {

        public UsuarioResult GetUsuario(UsuarioParameter parameter);
    }
}
