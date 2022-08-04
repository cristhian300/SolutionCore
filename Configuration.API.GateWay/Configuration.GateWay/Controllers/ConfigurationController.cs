using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SolutionCore.Infrastructure.Transport.Core.Authorization.Response;

namespace SolutionCore.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
     [EnableCors("mi_politica")]
    public class ConfigurationController : ControllerBase
    {
        private readonly IOptionsSnapshot<GetConfigurationResponse> _configurationOption;
        public ConfigurationController(IOptionsSnapshot<GetConfigurationResponse>  configurationOption )
        {
            _configurationOption = configurationOption;
        }


        [HttpPost]
        [AllowAnonymous]//No necesita Token
        public GetConfigurationResponse GetConfiguration() => _configurationOption.Value;


    }
}