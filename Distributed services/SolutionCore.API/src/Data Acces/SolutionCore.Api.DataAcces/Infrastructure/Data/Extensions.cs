
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;
 
 

namespace SolutionCore.Distributed_Processes.Dominio.Infrastructure.Data
{
    public static class Extensions
    {
        public static IServiceCollection AddDataServicesSQL(this IServiceCollection services, IConfiguration configuration)
        {
            var productConnection = configuration.GetConnectionString("SpartacusContext");
            services.AddDbContext<CoreContext>(options =>
            {
                options.UseSqlServer(productConnection);
            });
           
            return services;
        }


        public static IServiceCollection ConfigureAPI(this IServiceCollection services, IConfiguration configuration)
        {
            
            services
                //.AddAuthenticationService(configuration)
                //.AddOptions()
                //.AddCloudWatchLogging(configuration)
                //.AddCORS()
                //.AddMVCSupport()
                //.AddExceptionHandling()
                //.Configure<GetPublicConfigurationResponse>(configuration.GetSection("IdentityServer"))
                //.Configure<GetConfigurationResponse>(configuration.GetSection("Services"));
             .Configure<GetConfigurationResponse>(c => configuration.GetSection("Services").Bind(c));
            return services;
        }


    }
}
