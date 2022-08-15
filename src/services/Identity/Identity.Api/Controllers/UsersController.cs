using Identity.Api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Identity.Models;

namespace Identity.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        //public ApplicationDbContext ApplicationDbContext { get; }

        public UserManager<IdentityUser> _userManager { get; set; }
        public RoleManager<IdentityRole> _roleManager { get; set; }

        public UsersController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleMgr)
        {
           
            _userManager = userManager;
            _roleManager = roleMgr;
        }


        [HttpPost]
        public async Task<IdentityUser> ListUsuarios()
        {

            //if (User.Identity.IsAuthenticated)
            //{
            //    var detalle = HttpContext.User;
            //}

            var userByEmail = await _userManager.FindByEmailAsync("cristhian_666win@hotmail.com");
            return userByEmail;
        }


        [HttpPost]
        [Route("AddUsuarios")]
        public async Task<IdentityResult> AddUsuarios( )
        {
            var IdentityRequest = new IdentityUser
            {

                Email ="cristhian_666win@hotmail.com",
                UserName= "Cristhian"
            };
            var result = await _userManager.CreateAsync(IdentityRequest);
            return result;
        }


        [HttpPost]
        [Route("AddRoles")]
        public async Task<IdentityResult> AddRoles()
        {
            var IdentityRoleRequest = new IdentityRole
            {

                Name ="Administrador"
            };
            var result = await _roleManager.CreateAsync(IdentityRoleRequest);
            return result;
        }
    }
}
