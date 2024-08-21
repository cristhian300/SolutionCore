using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Application.DTO.Authorization.Response
{
    public class GetConfigurationResponse
    {

        public string SecurityUrl { get; set; }
        public string ImageUrl { get; set; }
        public string MaintenanceUrl { get; set; }
        public string PlanningUrl { get; set; }
        public string TaskUrl { get; set; }
        public string IntegrationUrl { get; set; }
        public string SystemConfigurationUrl { get; set; }
        public string InputUrl { get; set; }
        public string LoggingProcessUrl { get; set; }
        public string CoreUrl { get; set; }
    }
}
