namespace Belcorp.CM.Infrastructure.Transport.Configuration.Response
{
    using System.Collections.Generic;
    //using Belcorp.CM.Infrastructure.Transport.Core.Response;

    public class GetResourceSettingsResponse 
    {
        public IDictionary<string, object> Properties { get; set; }
    }
}
