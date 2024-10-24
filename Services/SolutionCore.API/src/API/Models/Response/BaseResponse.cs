using System.Net;

namespace PmfBff.Application.Models.Response
{
    public class BaseResponse<T>
    {
        public HttpStatusCode Code { get; set; }

        public string Description { get; set; }

        public T Payload { get; set; }
    }
}
