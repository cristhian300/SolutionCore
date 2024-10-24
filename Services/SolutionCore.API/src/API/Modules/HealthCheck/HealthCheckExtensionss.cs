using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;

namespace SolutionCore.Modules.HealthCheck
{
    public static class HealthCheckExtensions
    {

        public static IServiceCollection AddHealthCheck(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddHealthChecks()
           .AddSqlServer(configuration.GetConnectionString("SpartacusContext"), tags: new[] { "database" });

          
            return services;
        }

    }
}
