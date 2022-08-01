namespace Belcorp.CM.Infrastructure.Transport.Configuration.Response
{
    public class GetPublicConfigurationWebClientItemResponse
    {
        public string Id { get; set; }
        public string Secret { get; set; }
        public string AllowedScopes { get; set; }
        public string ADFSClientId { get; set; }
        public string ADFSSecretId { get; set; }
        public string ADFSEndpoint { get; set; }

    }
}
