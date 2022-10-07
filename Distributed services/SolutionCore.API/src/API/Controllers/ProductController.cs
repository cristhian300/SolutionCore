using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.PlatformAbstractions;
using Microsoft.Extensions.Configuration;
using PmfBff.Interfaces;
using PmfBff.Models;
using PmfBff.Models.Request;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
using SolutionCore.Application.Contracts.Contract.Product;
using SolutionCore.Infraestructura.Transport.Core.Product.Request;
using SolutionCore.Infraestructura.Transport.Core.Product.Response;

namespace SolutionCore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // GET: api/Product
       private IProductContract _IProductContract;
        private readonly IWebHostEnvironment _env;
        IUnitOfWork<CoreContext> _CoreContext;

        public IPmfRestClient _pmfRestClient { get; }

        public ProductController(
           IProductContract  IProductContract, 
            IWebHostEnvironment env, IUnitOfWork<CoreContext>  CoreContext ,
            IPmfRestClient pmfRestClient
            )
        {
          _IProductContract = IProductContract;
            _env = env;
            _CoreContext = CoreContext;
            _pmfRestClient = pmfRestClient;
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ListProductResponse> ListProduct()
        {
                ListProductRequest parameter = new ListProductRequest();
                parameter.PathUrlImage = $"{Request.Scheme}://{Request.Host}/images/";
                return await _IProductContract.ListProduct(parameter);
        }


        [HttpPost]
        public async Task<AddProductResponse> AddProduct([FromForm] AddProductRequest parameter )   
        {
            return await _IProductContract.AddProduct(parameter);
        }


        [HttpPost]
        
        public async Task<EditProductResponse> EditProduct([FromForm] EditProductRequest parameter)
        {
            return await _IProductContract.EditProduct(parameter);
        }


        [HttpPost]
        public async Task<IActionResult> TestProxy()
        {

            try
            {
                var request = new GenericRequest{
                Method= RestSharp.Method.POST,
                Url = $"api/Product/ListProduct",
                ServicePath = "http://localhost:25782/"
                //Body = request
            };

            var response = await _pmfRestClient.ExecuteClientGenericRequest<object>(request);
                //return GetResult( new PmfRestResponse(response.Code, response.Payload) );
                return GetResult(new PmfRestResponse(response.Code, response.Payload)) ;
            }
            catch (Exception e)
            {

                throw;
            }

          

        }

        protected ActionResult GetResult(PmfRestResponse response)
        {
            if (response != null)
            {
                return response.Status switch
                {
                    HttpStatusCode.OK => Ok(response.JSON),
                    HttpStatusCode.Created => StatusCode(StatusCodes.Status201Created, response.JSON),
                    HttpStatusCode.Conflict => StatusCode(StatusCodes.Status409Conflict, response.JSON),
                    HttpStatusCode.NoContent => NoContent(),
                    HttpStatusCode.BadRequest => StatusCode(StatusCodes.Status400BadRequest, response.JSON),
                    HttpStatusCode.InternalServerError => StatusCode(StatusCodes.Status500InternalServerError, response.JSON),
                    HttpStatusCode.Unauthorized => StatusCode(StatusCodes.Status401Unauthorized),
                    _ => NotFound(),
                };
            }
            return NotFound();
        }
    }
}
