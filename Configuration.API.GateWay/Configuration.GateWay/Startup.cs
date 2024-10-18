using Configuration.GateWay.models;
using Microsoft.AspNetCore.Builder;
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

            services.AddOcelot();

            

            services.AddControllers();
            services.AddOptions();
            services.AddLogging();


            services.AddCors(options =>
            {
                options.AddPolicy("mi_politica",
                    builder => builder
                         ////.AllowAnyOrigin()
                         .WithOrigins(
                        ////_configuration["Config:OriginCors"]
                        "http://botonerame.com", "https://botonerame.com", "https://www.botonerame.com"
                        )
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                       
                        );

                options.AddPolicy("AllowHeaders", builder =>
                {
                    builder.WithOrigins("http://botonerame.com","https://botonerame.com", "https://www.botonerame.com")
                             .WithHeaders(HeaderNames.ContentType, HeaderNames.Server,
                            HeaderNames.AccessControlAllowHeaders, HeaderNames.AccessControlExposeHeaders,
                            "x-custom-header", "x-path", "x-record-in-use", HeaderNames.ContentDisposition);
                });
            });


            services

              .Configure<GetConfigurationResponse>(_configuration.GetSection("Services"));

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
