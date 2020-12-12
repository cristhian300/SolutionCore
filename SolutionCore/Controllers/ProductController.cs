using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SolutionCore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // GET: api/Product
       

        // POST: api/Product
        [HttpPost]
        public void Post([FromBody] string value)
        {

            // prueba azure devops
            // prueba azure devops2
        }

        // PUT: api/Product/5

    }
}
