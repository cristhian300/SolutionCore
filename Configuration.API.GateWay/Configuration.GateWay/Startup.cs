using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;

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

            String[] ruta = { "http://localhost:44512" , "http://localhost:5000" };

            services.AddControllers();
            services.AddOptions();
            services.AddLogging();


            services.AddCors(options =>
            {
                options.AddPolicy("mi_politica",
                    builder => builder
                          //.AllowAnyOrigin()
                          .WithOrigins(
                        "http://localhost:4200",
                        "http://localhost:44512"
                        )
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                      
                        );
            });
            //   services.AddCors(opt => opt.AddPolicy("mi_politica",
            //builder =>
            //{
            //    builder
            //        .AllowAnyHeader()
            //        .AllowAnyMethod()
            //        .AllowCredentials()
            //        .AllowAnyOrigin();
            //        //.WithOrigins(ruta);
            //}));


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
            //app.UseAuthorization();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

             app.UseOcelot().Wait();

           
        }
    }
}
