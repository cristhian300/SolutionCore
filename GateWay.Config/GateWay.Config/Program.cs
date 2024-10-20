using GateWay.Api.Models;
using Microsoft.Extensions.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
 
using Ocelot.Values;

var builder = WebApplication.CreateBuilder(args);

var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

var env2 = builder.Environment.EnvironmentName;
builder.Configuration .AddJsonFile($"ocelot.{env2}.json", optional: false, reloadOnChange: true);
  

builder.Services.AddOcelot();

builder.Services.AddEndpointsApiExplorer();

builder.Services.Configure<GetConfigurationResponse>(builder.Configuration.GetSection("Services"));


builder.Services.AddControllers();
 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var origen = builder.Configuration.GetValue<string>("Config:OriginCors").Split(";");
//var corsUrls = origen.Get<string[]>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        polycyBuilder =>
        {
          

            polycyBuilder.WithOrigins(
                 origen

                );
            //.AllowAnyOrigin()
            polycyBuilder.AllowAnyHeader();
            polycyBuilder.AllowAnyMethod();
            polycyBuilder.AllowCredentials();

        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

 app.UseHttpsRedirection();

//app.UseCors("AllowOrigin");
//app.UseCors(options =>
//            options.WithOrigins(builder.Configuration["Config:OriginCors"])
//           .AllowAnyOrigin()
//            .AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();
app.MapControllers();

app.UseRouting();
app.UseAuthorization();
//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllers(); // Permite que tus controladores manejen las rutas
//});

app.MapControllers();
app.UseCors("AllowOrigin");
//app.MapGet("/", () => $"Este es el ambiente {env2}");
app.UseEndpoints(e => {   });

await app.UseOcelot();
app.Run();
