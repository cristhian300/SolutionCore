using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore;


using System.Reflection;
using Belcorp.CM.Infrastructure.Web.Configuration;
using Belcorp.CM.Infrastructure.Web.WebApp;

namespace SolutionCore.Api.DataAcces.Infrastructure.Data
{
   public static class WebHostHelper
    {

        public static void BuildAndRunWebApp<TProgram>(string[] args) where TProgram : class
        {
            WebHost.CreateDefaultBuilder(args)
                .AddRemoteConfiguration()
                .UseStartup<WebStartup>()
                .UseSetting(WebHostDefaults.ApplicationKey, typeof(TProgram).GetTypeInfo().Assembly.FullName)
                .Build()
                .Run();
        }

        //public static void BuildAndRunWebAPI<TStartup>(string[] args)
        //    where TStartup : class
        //{
        //    WebHost.CreateDefaultBuilder(args)
        //        .AddRemoteConfiguration()
        //        .UseStartup<TStartup>()
        //        .Build()
        //        .Run();
        //}

        //public static void BuildAndRunWebAPI<TProgram, TDependenciesConfiguration>(string[] args)
        //    where TProgram : class
        //    where TDependenciesConfiguration : class, IDependenciesConfiguration, new()
        //{
        //    WebHost.CreateDefaultBuilder(args)
        //        .AddRemoteConfiguration()
        //        .UseStartup<APIStartup<TProgram, TDependenciesConfiguration>>()
        //        .UseSetting(WebHostDefaults.ApplicationKey, typeof(TProgram).GetTypeInfo().Assembly.FullName)
        //        .Build()
        //        .Run();
        //}

        //public static void BuildAndRunConfigurationWebAPI<TProgram, TDependenciesConfiguration>(string[] args)
        //    where TProgram : class
        //    where TDependenciesConfiguration : class, IDependenciesConfiguration, new()
        //{
        //    WebHost.CreateDefaultBuilder(args)
        //        .AddConfigurationByResource()
        //        .UseStartup<UnsecureAPIStartup<TProgram, TDependenciesConfiguration>>()
        //        .UseSetting(WebHostDefaults.ApplicationKey, typeof(TProgram).GetTypeInfo().Assembly.FullName)
        //        .Build()
        //        .Run();
        //}
    }
}
