namespace Belcorp.CM.Infrastructure.Transport.Configuration.Response
{
     

    public class GetPublicConfigurationResponse  
    {
        public string IdentityUrl { get; set; }
        public GetPublicConfigurationClientsResponse Clients { get; set; }
    }
}
