using System;
using System.Diagnostics.CodeAnalysis;
using System.Net;
using YtMovieApis.Models.DTO;

namespace Evaluacion.Models
{
    
    public class RestResponse  
    {
        public RestResponse(HttpStatusCode status)
        {
            Status = status;
        }
        public RestResponse(HttpStatusCode status, object json)
        {
            Status = status;
            JSON = json;
        }

         

        public HttpStatusCode Status { get; set; }
        public Object JSON { get; set; }
    }
}