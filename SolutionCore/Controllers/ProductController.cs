using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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


        public ProductController(IProductContract  IProductContract, IWebHostEnvironment env, IUnitOfWork<CoreContext>  CoreContext)
        {
            _IProductContract = IProductContract;
            _env = env;
            _CoreContext = CoreContext;
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ListProductResponse> ListProduct([FromBody] ListProductRequest parameter)
        {
            return await  _IProductContract.ListProduct(parameter);
        }


        [HttpPost]
        //public async Task<ListProductResponse> AddProduct([FromForm] List<IFormFile> files, [FromBody] ListProductRequest parameter
        public async Task<ActionResult> AddProduct([FromForm] AddProductRequest parameter )
            
        {

            List<Product> lstProduct = new List<Product>();


            try
            {

           
            if (parameter.files.Count >= 1) {

                if( !Directory.Exists(_env.WebRootPath + "\\images\\"))
                {
                    Directory.CreateDirectory(_env.WebRootPath + "\\images\\");
                }


                foreach (var file in parameter.files)
                {
                     var type= file.ContentType.Split('/') ;

                    if (type[0] != "image") {
                        throw new Exception("Solo se acepta archivos tipo imagenes");
                    }
                    //lugar donde quiero copiar  C:\\abc\\final\\ + nombre
                    var path = Path.Combine(_env.WebRootPath, "images", file.FileName );
                    using (var Stream = System.IO.File.Create(path))
                    {
                        //crear el archivo
                         await   file.CopyToAsync(Stream);
                    }
                    var tamañobyte = file.Length;
                    var tamañoMegas =    tamañobyte / 1000000;
                    var extension = Path.GetExtension(file.FileName).Substring(1);
                    var nombre =  Path.GetFileNameWithoutExtension( file.FileName ) ;


                    Product product = new Product
                    {
                        Name = parameter.Name,
                        Description = parameter.Description,
                        Price=parameter.Price,
                        Photo = path

                    };

                    lstProduct.Add(product);
                
                }
                _CoreContext.DbContext.Products.AddRange(lstProduct);
                _CoreContext.SaveChanges();

            }

            
            //return await _IProductContract.ListProduct(parameter);
            return Ok(lstProduct);

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        

    }
}
