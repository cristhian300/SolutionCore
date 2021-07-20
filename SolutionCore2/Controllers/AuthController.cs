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
using SolutionCore.Infrastructure.Transport.Core.Authorization.Request;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;

namespace SolutionCore.Controllers
{
    [Route("api/[controller]/[action]")]
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
        public async Task<UsuarioResponse> GetUsuario([FromBody]  UsuarioRequest parameter)
        {
            return   await _IUsuarioContract.GetUsuario(parameter);

        }


        [HttpPost]
        public async Task<ListUsuarioResponse> ListUsuario([FromBody]  ListUsuarioRequest parameter)
        {
            return await _IUsuarioContract.ListUsuario(parameter);

        }
    }
}
