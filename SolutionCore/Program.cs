using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

 
using System.Threading;
using Microsoft.Extensions.DependencyInjection;
 
using System.IO;
 
 
using Microsoft.AspNetCore;
using SolutionCore.BackGroundService;

namespace SolutionCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        

        public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureLogging(logging =>
            {
                logging.ClearProviders();
                logging.AddConsole();
            })

            .ConfigureLogging((context,loggin)=> {
                loggin.ClearProviders();
                loggin.AddConfiguration(context.Configuration.GetSection("Logging"));

                loggin.AddConsole();
            })

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
            }).ConfigureServices((hostContext, services) =>
                 services.AddHostedService<CronJobService>()
               );

    }
}
