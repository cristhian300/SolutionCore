namespace Belcorp.CM.Client.Desktop.Web.Controllers
{
    using Belcorp.CM.Infrastructure.Transport.Configuration.Response;
    using Belcorp.CM.Infrastructure.Web.API;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;
    using Newtonsoft.Json;
    using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;
    using System;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;

    [Route("api/v1/[controller]/[action]")]
    //[EnableCors("mi_politica")]
    public class ConfigurationController  
    {
        private readonly IOptionsSnapshot<GetPublicConfigurationResponse> _publicConfigurationOptions;
        private readonly IOptionsSnapshot<GetConfigurationResponse> _configurationOptions;

        private readonly IConfiguration _configuration;

        public ConfigurationController(
            IOptionsSnapshot<GetPublicConfigurationResponse> publicConfigurationOptions,
            IOptionsSnapshot<GetConfigurationResponse> configurationOptions,
            IConfiguration configuration
            )
        {
            _publicConfigurationOptions = publicConfigurationOptions;
            _configurationOptions = configurationOptions;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        public GetPublicConfigurationResponse GetPublicConfiguration() => _publicConfigurationOptions.Value;

        [HttpPost]
        [AllowAnonymous]
        public async Task<GetConfigurationResponse> GetConfiguration()
        {
            var requestUrl = _configuration.GetValue<string>("ConfigurationService:Url");
            //var jsonParameter = JsonConvert.SerializeObject(_remoteConfigurationRequest);

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

            var httpClient = new HttpClient(clientHandler);
            var httpRequestMessage =
                new HttpRequestMessage
                {
                    RequestUri = new Uri(requestUrl),
                    Method = HttpMethod.Post,
                    //Content = new StringContent(jsonParameter, Encoding.UTF8, "application/json")
                };

            using (var response = await httpClient.SendAsync(httpRequestMessage).ConfigureAwait(false))
            {
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    if (response.StatusCode == HttpStatusCode.NotFound) return null;
                    if (response.StatusCode >= HttpStatusCode.BadRequest) return null;
                }

                var stream = await response.Content.ReadAsStreamAsync();
                using (var jsonReader = (JsonReader)new JsonTextReader(new StreamReader(stream)))
                    return (GetConfigurationResponse)new JsonSerializer().Deserialize(jsonReader, typeof(GetConfigurationResponse));
            }


        }

        //=> _configurationOptions.Value;
    }
}