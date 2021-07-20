using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;

namespace SolutionCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();


        }

        //public async static Task Main(string[] args)
        //{
        //    var host = CreateHostBuilder(args).Build();

        //    using var scope = host.Services.CreateScope();
        //    var services = scope.ServiceProvider;

        //    try
        //    {
        //        var dbContext = services.GetRequiredService<CoreContext>();

        //        if (dbContext.Database.IsSqlServer())
        //        {
        //            dbContext.Database.Migrate();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

        //        logger.LogError(ex, "An error occurred while migrating or seeding the database.");

        //        throw;
        //    }

        //    await host.RunAsync();
        //}

        public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)

 
             .ConfigureAppConfiguration((hostingContext, config) =>
             {
                 config
                     .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                     .AddJsonFile("appsettings.json", true, true)
                     .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true,
                         true)
                     
                     .AddEnvironmentVariables();
             })


            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });

       

    }


 
}
 
