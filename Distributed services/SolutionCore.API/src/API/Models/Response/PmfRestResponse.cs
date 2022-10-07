using System;
using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace PmfBff.Models
{
    //[ExcludeFromCodeCoverage]
    public class PmfRestResponse
    {
        public PmfRestResponse(HttpStatusCode status)
        {
            Status = status;
        }
        public PmfRestResponse(HttpStatusCode status, object json)
        {
            Status = status;
            JSON = json;
        }

        public HttpStatusCode Status { get; set; }
        public Object JSON { get; set; }
    }
}