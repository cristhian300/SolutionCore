using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
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

    [EnableCors("mi_politica")]
    [Authorize]  //Todos los metodos necesitan token 
    public class AuthController : ControllerBase
    {
        // GET: api/Auth

        private IUsuarioContract _IUsuarioContract;
        [AllowAnonymous]
        [HttpGet]
        public string MetAuth()
        {

            return "usuario getWat";
        }


        //[AllowAnonymous]//No necesita Token
        //[HttpGet ]
        //public IActionResult Login([FromQuery]  string userName , [FromQuery] string password)
        //{
        //    var user = new LoginRequest
        //        { 
        //      UserName = userName,
        //     Password= password
        //     };


        //    if (user == null)
        //    {

        //        return BadRequest("Algo Salio Mal");
        //    }

        //    if (user.UserName == "cristhian" && user.Password == "cristhian")
        //    {
        //        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SuperSecretaKey@345"));
        //        var signigCredencial = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        //        var tokenOption = new JwtSecurityToken(
        //            issuer: "https://localhos:5001",
        //            audience: "https://localhos:5001",
        //            claims: new List<Claim>(),
        //            expires: DateTime.Now.AddMinutes(5),
        //            signingCredentials: signigCredencial

        //            );

        //        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOption);
        //        return Ok(new { token = tokenString });
        //    }
        //    return Unauthorized();
        //}

        public AuthController(IUsuarioContract IUsuarioContract)
        {

            _IUsuarioContract = IUsuarioContract;
        }


        [HttpPost]
        public async Task<UsuarioResponse> GetUsuario([FromBody] UsuarioRequest parameter)
        {
            return await _IUsuarioContract.GetUsuario(parameter);

        }

        
        [HttpPost]
        public async Task<ListUsuarioResponse> ListUsuario([FromBody] ListUsuarioRequest parameter)
        {
            return await _IUsuarioContract.ListUsuario(parameter);

        }
      

        [HttpPost]
        public async Task<ListRolesResponse> ListRoles(ListRolesRequest parameter)
        {
            return await _IUsuarioContract.ListRoles(parameter);

        }




        [HttpPost]
        public async Task<AddUsuarioResponse> AddUsuario(AddUsuarioRequest parameter)
        {
            return await _IUsuarioContract.AddUsuario(parameter);

        }


        [HttpPost]
        public async Task<UpdateUsuarioResponse> UpdateUsuario(UpdateUsuarioRequest parameter)
        {
            return await _IUsuarioContract.UpdateUsuario(parameter);

        }



    }
}
