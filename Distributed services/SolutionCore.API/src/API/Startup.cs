using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using PmfBff.Interfaces;
using PmfBff.Services;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Application;
using SolutionCore.Modules.Authentication;
using SolutionCore.Modules.Feature;
using SolutionCore.Modules.HealthCheck;
using SolutionCore.Modules.Swagger;
using SolutionCore.Repositories;
using System.Text;

namespace SolutionCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddServicePersistence( Configuration);
            services.AddApplicationServices(Configuration);
            services.addAuthentication(Configuration);
            services.AddFeature(Configuration);
            services.AddSwagger();
            services.AddHealthCheck(Configuration);
            services.AddScoped<IPmfRestClient, PmfRestClient>();

        }

        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

             


            if (env.IsDevelopment()  )
            {
                app.UseDeveloperExceptionPage();
                
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TestService");
            });
            app.UseHttpsRedirection();


            //crear la base de datos que apunta
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<CoreContext>();
                context.Database.EnsureCreated();
            }

            app.UseStaticFiles();
         /*   app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\images")),
                RequestPath = new PathString("/images")
            });
            app.UseDirectoryBrowser(new DirectoryBrowserOptions()
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\images")),
                RequestPath = new PathString("/images")
            });*/

            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync("hosting enviromen " + env.EnvironmentName);
            //});

            app.UseRouting();

            //se agrego de JWT
             app.UseAuthentication();
             app.UseCors("mi_politica");
            
             app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.MapHealthChecksUI();
                endpoints.MapHealthChecks("/health", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
                {
                    Predicate = _ => true,
                    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                });
            });

         






        }    
           
  
        
    }
}
