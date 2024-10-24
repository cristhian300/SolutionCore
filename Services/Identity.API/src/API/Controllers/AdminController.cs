using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using YtMovieApis.Models.DTO;

namespace YtMovieApis.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    //[Authorize(Roles ="Admin")]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        public IActionResult  DataAdmin()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            //var identityx = HttpContext.User.Identity    ;
            var status = new Status();
            status.StatusCode = 1;
            status.Message = "Data from admin controller";
            return Ok(status);
        }


        [HttpGet]
        public IActionResult ClaimUser()
        {
            

            var user = HttpContext.User;
 

            var result = user.Claims.Select(s => new
            {
                s.Type,
                s.Value
            }).ToList();


            object data = new
            {
                user.Identity.Name,
                user.Identity.IsAuthenticated,
                AuthenticationType = user.Identity.AuthenticationType,
                result =result 
               
            };

            return  Ok(data);
            
        }
    }
}
