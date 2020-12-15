using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public ProductController(IProductContract  IProductContract, IWebHostEnvironment env)
        {
            _IProductContract = IProductContract;
            _env = env;
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ListProductResponse> Post([FromBody] ListProductRequest parameter)
        {
            var path = Path.Combine(_env.WebRootPath, "images", "defaul_pamplonera.jpg");


            return await  _IProductContract.ListProduct(parameter);
            // prueba azure devops
            // prueba azure devops2
            // prueba azure devops5
        }

        // PUT: api/Product/5

    }
}
