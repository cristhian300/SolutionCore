using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace PmfBff.Models.Errors
{
    [ExcludeFromCodeCoverage]
    public class BadRequestError : ApiErrorModel
    {
        public BadRequestError() : base(400, HttpStatusCode.BadRequest.ToString()) { }
        public BadRequestError(string message) : base(400, HttpStatusCode.BadRequest.ToString(), message) { }
    }
}
