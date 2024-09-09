using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Repositories.Persistence;
using SolutionCore.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Repositories
{
    public static  class ConfigureServices
    {

        public static IServiceCollection AddServicePersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddUnitOfWork<CoreContext>();

            var productConnection = configuration.GetConnectionString("SpartacusContext");
            services.AddDbContext<CoreContext>(options =>
            {
                options.UseSqlServer(productConnection
                    ,
                     //builder => builder.MigrationsAssembly(typeof(CoreContext).Assembly.FullName)
                     builder => builder.MigrationsAssembly("SolutionCore")
                    );
            });

            services.AddTransient<IUsuarioRepository, UsuarioRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            return services;
        }

    }
}
