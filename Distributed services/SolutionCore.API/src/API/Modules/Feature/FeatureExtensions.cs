using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SolutionCore.Modules.Feature
{
    public static class FeatureExtensions
    {

        public static IServiceCollection AddFeature(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("mi_politica",
                    builder => builder
                       // .AllowAnyOrigin()
                       .WithOrigins(
                        "http://localhost:4200",
                        "http://localhost:44512"
                        )
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            services.AddControllersWithViews();
            services.AddControllers();

            return services;
        }
    }
}
