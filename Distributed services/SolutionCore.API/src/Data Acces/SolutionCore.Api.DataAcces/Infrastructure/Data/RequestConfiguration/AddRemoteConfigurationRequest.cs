namespace Belcorp.CM.Infrastructure.Transport.Configuration.Request
{
    public class AddRemoteConfigurationRequest
    {
        public string Url { get; set; }
        public string ResourceSecret { get; set; }
        public string EnvironmentName { get; set; }
    }
}
