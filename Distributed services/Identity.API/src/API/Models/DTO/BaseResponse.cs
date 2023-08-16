using System.Net;

namespace YtMovieApis.Models.DTO
{
    public class BaseResponse<T>
    {
        public HttpStatusCode code { get; set; }

        public string Message { get; set; }

        public T Payload { get; set; }
    }
}
