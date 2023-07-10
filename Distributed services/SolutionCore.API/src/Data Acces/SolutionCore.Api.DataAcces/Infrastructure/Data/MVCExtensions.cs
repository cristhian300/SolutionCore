
namespace Belcorp.CM.Infrastructure.Web.MVC
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.DependencyInjection;

    public static class MVCExtensions
    {
        public static IServiceCollection AddMVCSupport(this IServiceCollection services)
        {
            //services
            //    .AddMvc(options => options.InputFormatters.Insert(0, new TextPlainInputFormatter()))
            //    .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
            //    .AddJsonOptions(options =>
            //    {
            //        options.SerializerSettings.ContractResolver =
            //            new Newtonsoft.Json.Serialization.DefaultContractResolver();


            //        //services
            //        //.AddMvc()
            //        //.AddJsonOptions(o => 
            //        //{ o.JsonSerializerOptions.PropertyNamingPolicy = null; 
            //        //    o.JsonSerializerOptions.DictionaryKeyPolicy = null; });
            //    });
            services
            .AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            .AddNewtonsoftJson(opt =>
            { opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; });
            return services;
        }
    }
}
