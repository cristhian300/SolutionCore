//using Belcorp.CM.Infrastructure.Web.API;
using Belcorp.CM.Infrastructure.Web.API;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Belcorp.CM.Infrastructure.Web.WebApp
{
    public class WebStartup
    {
        private readonly IConfiguration _configuration;

        public WebStartup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureWebApp(_configuration);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.ConfigureWeb(env);
        }
    }
}
