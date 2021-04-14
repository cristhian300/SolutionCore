using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace Configuration.GateWay
{
    public class Program
    {
        public static void Main(string[] args)
        {

            CreateHostBuilder(args).Build().Run();
          
        }

        public static IWebHostBuilder CreateHostBuilder(string[] args) =>

             WebHost.CreateDefaultBuilder(args)
         //.UseUrls("http://*:5052")
         .ConfigureAppConfiguration((hostingContext, config) =>
         {
             //if (hostingContext.HostingEnvironment.EnvironmentName == "Production")
             //{
             //    config
             //   .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
             //   .AddJsonFile("ocelot.Production.json")
             //   .AddEnvironmentVariables();
             //}
             //else
             //{
             //
             config
              .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                        .AddJsonFile("appsettings.json", true, true)
                        .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
              .AddJsonFile("ocelot.json")
              .AddEnvironmentVariables();
             //}

         })
        .ConfigureServices(services =>
        {
            services.AddOcelot();
            //.AddConsul();
        })
       .ConfigureLogging((hostingContext, logging) =>
            {
                //add your logging
            })
                .UseIISIntegration()
        .Configure(app =>
        {
            app.UseOcelot().Wait();
        });
            //.Build()
            //    .Run();
        // Host.CreateDefaultBuilder(args)
        //  .ConfigureAppConfiguration((hostingContext, config) =>
        //  {
        //      config
        //          .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
        //          .AddJsonFile("appsettings.json", true, true)
        //          .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true,
        //              true)
        //          .AddJsonFile("ocelot.json", false, false)
        //          .AddEnvironmentVariables();
        //  })



        //.ConfigureWebHostDefaults(webBuilder =>
        //{
        //    webBuilder.UseStartup<Startup>();
        //    //webBuilder.UseUrls("http://localhost:5052");

        //});


    }
}
