using GateWay.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GateWay.Config.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {

        private readonly IOptionsSnapshot<GetConfigurationResponse> _configurationOption;
        public ConfigurationController(IOptionsSnapshot<GetConfigurationResponse> configurationOption)
        {
            _configurationOption = configurationOption;
        }


        [HttpPost,Route("GetConfiguration")]
        [AllowAnonymous]//No necesita Token
        public GetConfigurationResponse GetConfiguration() => _configurationOption.Value;
    }
}
