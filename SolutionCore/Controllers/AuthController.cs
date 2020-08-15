using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SolutionCore.Contract;
using SolutionCore.Infrastructure.Data.CQS.Authorization.Query;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Parameter;
using SolutionCore.Infrastructure.Transport.Core.Authorization.CQS.Query.Result;

namespace SolutionCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // GET: api/Auth

        private IUsuarioContract _IUsuarioContract;

        public AuthController(IUsuarioContract IUsuarioContract)
        {

            _IUsuarioContract = IUsuarioContract;
        }

       
       [HttpPost]
        public UsuarioResult Post(UsuarioParameter parameter)
        {
            return _IUsuarioContract.GetUsuario(parameter);

        }


    }
}
