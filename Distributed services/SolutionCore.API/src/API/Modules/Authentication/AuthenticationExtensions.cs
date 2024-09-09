
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace SolutionCore.Modules.Authentication
{
    public static class AuthenticationExtensions
    {

        public static IServiceCollection addAuthentication( this IServiceCollection services , IConfiguration configuration)
        {



            var secret = Encoding.UTF8.GetBytes(configuration.GetValue<string>("SecretKey"));

            /*Autenticacion para WEBTOKEN*/
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(secret),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        //ValidateLifetime = true,
                    };
                });
            return services;
        }

    }
}
