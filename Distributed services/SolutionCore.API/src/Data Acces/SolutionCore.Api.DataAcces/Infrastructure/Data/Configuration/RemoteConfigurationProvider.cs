namespace Belcorp.CM.Infrastructure.CrossCutting.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Belcorp.CM.Infrastructure.Transport.Configuration.Request;
    using Belcorp.CM.Infrastructure.Transport.Configuration.Response;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;
    using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;

    public class RemoteConfigurationProvider : ConfigurationProvider, IConfigurationSource
    {
        private readonly AddRemoteConfigurationRequest _remoteConfigurationRequest;

        public RemoteConfigurationProvider(AddRemoteConfigurationRequest remoteConfigurationRequest)
        {
            _remoteConfigurationRequest = remoteConfigurationRequest ?? throw new ArgumentNullException(nameof(remoteConfigurationRequest));
        }

        internal IDictionary<string, string> Properties => Data;

        public override void Load()
        {            
            var url = _remoteConfigurationRequest.Url;
            var task = RemoteLoadAsync(url);
            
            task.Wait();

            var response = task.Result;

            if (response == null) return;
            //if (response.State.HasError) return;

            if (response.Properties == null) return;

            foreach (var remoteProperty in response.Properties)
                Data[remoteProperty.Key] = remoteProperty.Value?.ToString();
        }

        protected internal virtual async Task<GetResourceSettingsResponse> RemoteLoadAsync(string requestUri)
        {
            var requestUrl = _remoteConfigurationRequest.Url;
            var jsonParameter = JsonConvert.SerializeObject(_remoteConfigurationRequest);

            HttpClientHandler clientHandler = new HttpClientHandler();
            clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

            var httpClient = new HttpClient(clientHandler);
            var httpRequestMessage =
                new HttpRequestMessage
                {
                    RequestUri = new Uri(requestUrl),
                    Method = HttpMethod.Post,
                    Content = new StringContent(jsonParameter, Encoding.UTF8, "application/json")
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
                    return (GetResourceSettingsResponse)new JsonSerializer().Deserialize(jsonReader, typeof(GetResourceSettingsResponse));
            }
        }

        public IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            var configurationBuilder = new ConfigurationBuilder();
            foreach (var configurationSource in builder.Sources)
            {
                if (configurationSource == this) break;

                configurationBuilder.Add(configurationSource);
            }

            configurationBuilder.Build();
            return this;
        }
    }
}
