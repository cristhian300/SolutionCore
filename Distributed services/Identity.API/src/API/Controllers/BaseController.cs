using Evaluacion.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using PmfBff.Domain.Shared.Constants;
//using PmfBff.Models;
using System.Net;

namespace PmfBff.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        protected ActionResult GetResult(RestResponse response)
        {
            if(response != null)
            {
                return response.Status switch
                {
                    HttpStatusCode.OK => Ok(response.JSON),
                    HttpStatusCode.Created => StatusCode(StatusCodes.Status201Created, response.JSON),
                    HttpStatusCode.Conflict => StatusCode(StatusCodes.Status409Conflict, response.JSON),
                    HttpStatusCode.NoContent => NoContent(),
                    HttpStatusCode.BadRequest => StatusCode(StatusCodes.Status400BadRequest, response.JSON),
                    HttpStatusCode.InternalServerError => StatusCode(StatusCodes.Status500InternalServerError, response.JSON),
                   
                    _ => NotFound(response.JSON),
                };
            }
            return NotFound();
        }

        //protected string GetUserId()
        //{
        //    return HttpContext.Items[ClaimConstant.Email].ToString();
        //}

        //protected string GetAzureToken()
        //{
        //    return HttpContext.Items[ClaimConstant.AzureToken].ToString();
        //}
    }
}
