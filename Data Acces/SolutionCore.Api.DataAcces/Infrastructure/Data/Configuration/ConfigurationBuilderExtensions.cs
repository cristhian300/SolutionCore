using Belcorp.CM.Infrastructure.Transport.Configuration.Request;
using Microsoft.Extensions.Configuration;
using System;

namespace Belcorp.CM.Infrastructure.CrossCutting.Configuration
{
    public static class ConfigurationBuilderExtensions
    {
        public static IConfigurationBuilder AddRemoteConfiguration(this IConfigurationBuilder configurationBuilder, AddRemoteConfigurationRequest defaultSettings)
        {
            if (configurationBuilder == null) throw new ArgumentNullException(nameof(configurationBuilder));
            if (defaultSettings == null) throw new ArgumentNullException(nameof(defaultSettings));

            configurationBuilder.Add(new RemoteConfigurationProvider(defaultSettings));
            return configurationBuilder;
        }
    }
}
