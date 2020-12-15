
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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


    }
}
