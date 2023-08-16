using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SolutionCore.Contract;
using SolutionCore.Infrastructure.Data.CQS.Authorization.Query;
using Microsoft.OpenApi.Models;
using System;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SolutionCore.Distributed_Processes.Dominio.Infrastructure.Data;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;
using SolutionCore.Distributed_Processes.Dominio.Application;
using SolutionCore.Application.Contracts.Contract.Product;
using SolutionCore.Application.Application.Product;
using SolutionCore.Api.DataAcces.Infrastructure.Data.CQS.Product.Query;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;
using PmfBff.Interfaces;
using PmfBff.Services;

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

            var secret =  Encoding.UTF8.GetBytes(Configuration.GetValue<string>("SecretKey"));
           
            /*Autenticacion para WEBTOKEN*/
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(option =>
               {
                   option.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       ValidIssuer = "https://localhos:5001",
                       ValidAudience = "https://localhos:5001",
                       IssuerSigningKey = new SymmetricSecurityKey(secret)
                   };
               });


  
           
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
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyTestService", Version = "v1", });
                c.AddSecurityDefinition("Bearer",new OpenApiSecurityScheme
                {
                 In = ParameterLocation.Header,
                 Description="Please Insert token",
                 Name="Authorization",
                 Type=SecuritySchemeType.Http,
                 BearerFormat="JWT",
                 Scheme="bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme{
                    
                        Reference=new OpenApiReference{
                        
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer" 
                        }
                    }, 
                    new string[]{}
                    }
                });
            });


            // In production, the Angular files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/dist";
            //});

            services.AddTransient<IUsuarioQuery, UsuarioQuery>();
            services.AddTransient<IUsuarioContract, UsuarioApplication>();

            services.AddTransient<IProductQuery, ProductQuery>();
            services.AddTransient<IProductContract, ProductApplication>();

      

            //services.AddSingleton<IHostedService, CronJobService>();
            //services.AddScoped<CronJobService>();
            services.AddScoped<IPmfRestClient, PmfRestClient>();
            services.AddUnitOfWork<CoreContext>();

            //AddSwagger(services);

            //Cadena de Conexion de base de datos SQL Server
            //services.AddDbContext<CoreContext>(option => option.UseSqlServer(Configuration["ConnectionStrings:SpartacusContext"]));
            //services.AddDataServicesSQL(Configuration);
            var productConnection = Configuration.GetConnectionString("SpartacusContext");
            services.AddDbContext<CoreContext>(options =>
            {
                options.UseSqlServer(productConnection);
            });

           

            //estrae informacion AppSetting
            //services.Configure<GetConfigurationResponse>(Configuration.GetSection("Services"));
            //services.ConfigureAPI(Configuration);
        }

        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

             


            if (env.IsDevelopment())
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


            //if (!env.IsDevelopment())
            //{
            //    app.UseSpaStaticFiles();
            //}


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
                  
            });

         






        }    
           
  
        
    }
}
