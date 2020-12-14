using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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


        public ProductController(IProductContract  IProductContract)
        {
            _IProductContract = IProductContract;
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ListProductResponse> Post([FromBody] ListProductRequest parameter)
        {

            return await  _IProductContract.ListProduct(parameter);
            // prueba azure devops
            // prueba azure devops2
            // prueba azure devops5
        }

        // PUT: api/Product/5

    }
}
