using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PmfBff.Interfaces;
using PmfBff.Services;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Application;
using SolutionCore.Application.Application.Product;
using SolutionCore.Application.Contracts.Contract.Product;
using SolutionCore.Contract;
using SolutionCore.Distributed_Processes.Dominio.Application;
using SolutionCore.Repositories;
using System.Text;
using Transversal.Mapper;

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
            
            //Configurar mapper de Clase creada
            //services.AddAutoMapper(x => x.AddProfile(new MappingProfile()  ));
            var mappingConfig = new MapperConfiguration(
                mc => {
                    mc.AddProfile(new MappingProfile());
                       });
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            //------------------------------------------------------

 
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
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(secret),
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       //ValidateLifetime = true,
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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Master.Core", Version = "v1", });
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
      
            //services.AddSingleton<IHostedService, CronJobService>();
            //services.AddScoped<CronJobService>();
            services.AddScoped<IPmfRestClient, PmfRestClient>();
           

            //AddSwagger(services);


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
