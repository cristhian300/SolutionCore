using Configuration.GateWay.models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System;

namespace Configuration.GateWay
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration _configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            var origenesAllow = _configuration.GetValue<string>("Config:OriginCors").Split(";");

            services.AddCors(options =>
            {
                options.AddPolicy("mi_politica",
                    builder => builder
                        .WithOrigins(
                         origenesAllow
                         )
                         .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        );
            });

            services.AddOcelot();
            services.AddControllers();
            services.Configure<GetConfigurationResponse>(_configuration.GetSection("Services"));
            services.AddOptions();
            services.AddLogging();
              

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("mi_politica");

           
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

             app.UseOcelot().Wait();

           
        }
    }
}
