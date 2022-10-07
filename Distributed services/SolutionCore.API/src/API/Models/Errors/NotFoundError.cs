using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace PmfBff.Models.Errors
{
    [ExcludeFromCodeCoverage]
    public class NotFoundError : ApiErrorModel
    {
        public NotFoundError() : base(404, HttpStatusCode.NotFound.ToString()) { }
        public NotFoundError(string message) : base(404, HttpStatusCode.NotFound.ToString(), message) { }
    }
}
