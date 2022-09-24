using Microsoft.Extensions.DependencyInjection;

namespace Belcorp.CM.Infrastructure.Web.ExceptionHandling
{
    public static class ExceptionHandlingExtensions
    {
        public static IServiceCollection AddExceptionHandling(this IServiceCollection services)
        {
            services.AddScoped<ApiExceptionFilter>();

            return services;
        }
    }
}
