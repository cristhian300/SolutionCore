using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SolutionCore.Modules.Feature
{
    public static class FeatureExtensions
    {

        public static IServiceCollection AddFeature(this IServiceCollection services, IConfiguration configuration)
        {

            var origen = configuration.GetValue<string>("Config:OriginCors").Split(";");

            services.AddCors(options =>
            {
                options.AddPolicy("mi_politica",
                    builder => builder

                    .WithOrigins(
                     origen
                     )
                    .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        );
            });

            services.AddControllersWithViews();
            services.AddControllers();

            return services;
        }
    }
}
