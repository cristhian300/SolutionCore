//using Belcorp.CM.Infrastructure.CrossCutting.Configuration;
//using Belcorp.CM.Infrastructure.Transport.Configuration.Request;

namespace Belcorp.CM.Infrastructure.Web.Configuration
{
    using Belcorp.CM.Infrastructure.CrossCutting.Configuration;
    using Belcorp.CM.Infrastructure.Transport.Configuration.Request;
    //using AWS.Logger;    
    //using Amazon.Runtime;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;

    public static class WebHostBuilderExtensions
    {
        //public static IWebHostBuilder AddConfigurationByResource(this IWebHostBuilder hostBuilder)
        //{
        //    hostBuilder.ConfigureAppConfiguration((context, configurationBuilder) =>
        //    {
        //        configurationBuilder.AddJsonFile(@"Config/Core/coreconfig.json", false, true).Build();
        //        configurationBuilder.AddJsonFile(@"Config/Core/coreconfig." + context.HostingEnvironment.EnvironmentName + ".json", false, true).Build();

        //        configurationBuilder.AddJsonFile(@"Config/Gateway/gatewayconfig.json", false, true).Build();
        //        configurationBuilder.AddJsonFile(@"Config/Gateway/gatewayconfig." + context.HostingEnvironment.EnvironmentName + ".json", false, true).Build();

        //        configurationBuilder.AddJsonFile(@"Config/API/apiconfig.json", false, true).Build();
        //        configurationBuilder.AddJsonFile(@"Config/API/apiconfig." + context.HostingEnvironment.EnvironmentName + ".json", false, true).Build();

        //        configurationBuilder.AddJsonFile(@"Config/Silo/siloconfig.json", false, true).Build();
        //        configurationBuilder.AddJsonFile(@"Config/Silo/siloconfig." + context.HostingEnvironment.EnvironmentName + ".json", false, true).Build();

        //        configurationBuilder.AddJsonFile(@"Config/Worker/workerconfig.json", false, true).Build();
        //        configurationBuilder.AddJsonFile(@"Config/Worker/workerconfig." + context.HostingEnvironment.EnvironmentName + ".json", false, true).Build();

        //        configurationBuilder.AddJsonFile(@"Config/EMR/emrconfig.json", false, true).Build();
        //        configurationBuilder.AddJsonFile(@"Config/EMR/emrconfig." + context.HostingEnvironment.EnvironmentName + ".json", false, true).Build();
        //    });

        //    return hostBuilder;
        //}

        public static IWebHostBuilder AddRemoteConfiguration(this IWebHostBuilder hostBuilder)
        {
            hostBuilder.ConfigureAppConfiguration((context, configurationBuilder) =>
            {

                //configurationBuilder.AddJsonFile("configurationServiceSettings.json", false, true);
                //configurationBuilder.AddJsonFile("configurationServiceSettings." + context.HostingEnvironment.EnvironmentName + ".json", false, true);

                configurationBuilder.AddJsonFile("appsettings.json", false, true);
                configurationBuilder.AddJsonFile("appsettings." + context.HostingEnvironment.EnvironmentName + ".json", false, true);

                
                var configurationServiceSettings = configurationBuilder.Build();


                var request = new AddRemoteConfigurationRequest();
                configurationServiceSettings.GetSection("ConfigurationService").Bind(request);
                request.EnvironmentName = context.HostingEnvironment.EnvironmentName;

                configurationBuilder.AddRemoteConfiguration(request);
            });

            return hostBuilder;
        }
    }
}
