using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore;


using System.Reflection;

namespace SolutionCore.Api.DataAcces.Infrastructure.Data
{
   public static class WebHostHelper
    {

        public static void BuildAndRunWebAPI<TProgram>(string[] args)
            where TProgram : class
        {
            //IWebHost.CreateDefaultBuilder(args)
            //    .AddRemoteConfiguration()
            //    .UseStartup<Startup>()
            //    //.UseSetting(WebHostDefaults.ApplicationKey, typeof(TProgram).GetTypeInfo().Assembly.FullName)
            //    .Build()
            //    .Run();
        }
    }
}
