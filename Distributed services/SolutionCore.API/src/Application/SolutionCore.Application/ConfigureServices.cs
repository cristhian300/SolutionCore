using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Application.Application.Products;
using SolutionCore.Application.Contracts.Contract.Product;
using SolutionCore.Contract;
using SolutionCore.Distributed_Processes.Dominio.Application;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Application
{
    public static class ConfigureServices
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddTransient<IUsuarioApplication, UsuarioApplication>();
            services.AddTransient<IProductApplication, ProductApplication>();
            return services;
        }

    }
}
