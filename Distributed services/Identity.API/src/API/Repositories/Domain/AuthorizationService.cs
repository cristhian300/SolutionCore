using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using YtMovieApis.Models.Domain;
using YtMovieApis.Models;
using YtMovieApis.Models.DTO;
using YtMovieApis.Repositories.Abstract;
using Evaluacion.Models;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
 

namespace YtMovieApis.Repositories.Domain
{
    public class AuthorizationService : IAuthorizaService

    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenService _tokenService;
        private readonly DatabaseContext _context;
 
        public AuthorizationService(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ITokenService  tokenService ,
            DatabaseContext context
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _context = context;
        }

        public async Task<RestResponse> Login(LoginModel model)
        {

            RestResponse response;

            BaseResponse<object>  result ;

            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = _tokenService.GetToken(authClaims);
                var refreshToken = _tokenService.GetRefreshToken();

                var tokenInfo = _context.TokenInfo.FirstOrDefault(a => a.Usename == user.UserName);
                if (tokenInfo == null)
                {
                    var info = new TokenInfo
                    {
                        Usename = user.UserName,
                        RefreshToken = refreshToken,
                        RefreshTokenExpiry = DateTime.Now.AddDays(1)
                    };
                    _context.TokenInfo.Add(info);
                }

                //else
                //{
                //    tokenInfo.RefreshToken = refreshToken;
                //    tokenInfo.RefreshTokenExpiry = DateTime.Now.AddDays(1);
                //}


                try
                {
                    _context.SaveChanges();
                    result = new BaseResponse<object>();
                    result.Payload = new LoginResponse
                    {
                        Name = user.Name,
                        Username = user.UserName,
                        Token = token.TokenString,
                        RefreshToken = refreshToken,
                        Expiration = token.ValidTo,
                    };
                    result.Message = "Logged in";
                    result.code = HttpStatusCode.OK;

                    response = new RestResponse(HttpStatusCode.OK, result);
                    return response;

                }
                catch (Exception ex)
                {
                    response = new RestResponse(HttpStatusCode.InternalServerError, ex.Message);
                    return response;
                }
            }
            //login failed condition

            response = new RestResponse( HttpStatusCode.OK ,  new BaseResponse<object>
            {
                code = HttpStatusCode.OK,
                Message = "Invalid Username or Password",

            });
            return response;
             
        }

        public async Task<RestResponse> Registration(RegistrationModel model)
        {
            RestResponse rest;
            

            // check if user exists
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {

                rest = new RestResponse(HttpStatusCode.OK, new BaseResponse<object>
                {
                    code = HttpStatusCode.OK,
                    Message = "Invalid username" 

            });
                
                return rest;
            }
            var user = new ApplicationUser
            {
                UserName = model.Username?.ToLower(),
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = model.Email,
                Name = model.Name,
                
            };
            // create a user here
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
             
                rest = new RestResponse(HttpStatusCode.OK , new BaseResponse<object>
                {
                    code = HttpStatusCode.OK,
                    Message =  "User creation failed" 

                });
               
                return rest;
            }

            // add roles here
            // for admin registration UserRoles.Admin instead of UserRoles.Roles
            //agrega el rol Principal
            if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            //agrega a la tabla User_roles
            if (await _roleManager.RoleExistsAsync(UserRoles.User))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.User);
            }
              
            rest = new RestResponse(HttpStatusCode.OK,   new BaseResponse<object>
            {
                code = HttpStatusCode.OK,
                Message = "Sucessfully registered"

            });
           
            return rest;
        }
    }
}
