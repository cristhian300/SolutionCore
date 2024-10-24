using Microsoft.AspNetCore.Mvc;
using PmfBff.Application.Models.Response;
using PmfBff.Models;
using PmfBff.Models.Request;
//using RestSharp;
using System.Threading.Tasks;

namespace PmfBff.Interfaces
{
    public interface IPmfRestClient
    {
        public ActionResult ForceResponseToFront(PmfRestResponse response);
        public Task<PmfRestResponse> ExecuteClientRequest(PmfRestRequest request);

        Task<BaseResponse<T>> ExecuteClientGenericRequest<T>(GenericRequest request);
    }
}