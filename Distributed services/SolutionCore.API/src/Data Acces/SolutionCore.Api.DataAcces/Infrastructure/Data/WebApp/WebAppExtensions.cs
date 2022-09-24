namespace Belcorp.CM.Infrastructure.Web.WebApp
{
    using Belcorp.CM.Infrastructure.Transport.Configuration.Response;
    using Belcorp.CM.Infrastructure.Web.ExceptionHandling;
    using Belcorp.CM.Infrastructure.Web.MVC;
    using Belcorp.CM.Infrastructure.Web.Security;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;

    public static class WebAppExtensions
    {
        public static IServiceCollection ConfigureWebApp(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services
                .AddOptions()
                .AddLogging()
                .AddCORS()
                .AddMVCSupport()
                .AddExceptionHandling()
               .Configure<GetPublicConfigurationResponse>(configuration.GetSection("IdentityServer"))
                .Configure<GetConfigurationResponse>(configuration.GetSection("Services"))
                .AddSpaStaticFiles(config => { config.RootPath = "ClientApp/dist"; });

            return services;
        }
    }
}
