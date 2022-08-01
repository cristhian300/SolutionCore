namespace Belcorp.CM.Infrastructure.Web.API
{
    using Belcorp.CM.Infrastructure.CrossCutting.Constants;
    using Belcorp.CM.Infrastructure.Web.Security;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;
     using Microsoft.AspNetCore.SpaServices.AngularCli;
    using Microsoft.AspNetCore.Builder;
    using System;

    public static class ApplicationBuilderExtensions
    {
        public static void ConfigureAPI<TProgram>(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            RequestLocalizationOptions localizationOptions = new RequestLocalizationOptions();
            localizationOptions.SetDefaultCulture(Constants.CultureGlobalization.CULTURE_INFO);

            app.UseAllowAllCORS();
            app.UseAuthentication();
            app.UseRequestLocalization(localizationOptions);
            app.UseMvc();
        }

        public static void ConfigureWeb(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app
                .UseRouting()
                //.UseMvc(routes => { routes.MapRoute("default", "{controller}/{action=Index}/{id?}"); })
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller}/{action=Index}/{id?}");
                })
                .UseAllowAllCORS()
                .UseAuthentication()
                //.UseSpa(spa =>
                //{
                //    spa.Options.SourcePath = "ClientApp";
                //    if (env.IsDevelopment()) spa.UseAngularCliServer("start");
                //});
                .UseSpa(spa =>
                {
                    // To learn more about options for serving an Angular SPA from ASP.NET Core,
                    // see https://go.microsoft.com/fwlink/?linkid=864501

                    spa.Options.SourcePath = "ClientApp";

                    if (env.IsDevelopment())
                    {
                        spa.Options.StartupTimeout = new TimeSpan(0, 10, 0);
                        spa.UseAngularCliServer(npmScript: "start");
                    }
                });
        }
    }
}
