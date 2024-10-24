using Newtonsoft.Json;
using System.Diagnostics.CodeAnalysis;

namespace PmfBff.Models
{
    [ExcludeFromCodeCoverage]
    public class ApiErrorModel
    {
        public int StatusCode { get; set; }
        public string StatusDescription { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Message { get; set; }

        public ApiErrorModel(int statusCode, string statusDescription)
        {
            this.StatusCode = statusCode;
            this.StatusDescription = statusDescription;
        }

        public ApiErrorModel(int statusCode, string statusDescription, string message)
            : this(statusCode, statusDescription)
        {
            this.Message = message;
        }
    }
}