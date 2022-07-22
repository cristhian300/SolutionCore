using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace PmfBff.Models.Errors
{
    [ExcludeFromCodeCoverage]
    public class InternalServerError : ApiErrorModel
    {
        public InternalServerError() : base(500, HttpStatusCode.InternalServerError.ToString()) { }
        public InternalServerError(string message) : base(500, HttpStatusCode.InternalServerError.ToString(), message) { }
    }
}
