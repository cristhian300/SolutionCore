



namespace SolutionCore.Api.DataAcces.Infrastructure.Data.CQS.Product.Query
{

    using Arch.EntityFrameworkCore.UnitOfWork;
    using Microsoft.AspNetCore.Hosting;
    using SolutionCore.Infraestructura.Transport.Core.Product.QueryEntity;
    using SolutionCore.Infraestructura.Transport.Core.Product.Request;
    using SolutionCore.Infraestructura.Transport.Core.Product.Response;
    using SolutionCore.Infrastructure.Data.CQS.Authorization.Query;
    using System;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web;
    using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
    using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc.Routing;
    using Microsoft.AspNetCore.Mvc;

     
    using System.Net.Http;
    using System.Threading.Tasks;
 

    public class ProductQuery: IProductQuery
    {

        private IHostingEnvironment hostingEnvironment;
      
        //private  IHttpContextAccessor HttpContextAccessor;


        IUnitOfWork<CoreContext> _CoreContext;
        public ProductQuery(
            //IHttpContextAccessor httpContextAccessor,


            IHostingEnvironment env, IUnitOfWork<CoreContext>  CoreContext)
        {
       //HttpContextAccessor = httpContextAccessor;
            hostingEnvironment = env;
            _CoreContext = CoreContext;
        }


        public ListProductResponse ListProduct(ListProductRequest  parameter ) {



            //if (System.IO.File.Exists(fileSavePath))
            //{
            //    System.IO.File.Delete(fileSavePath);
            //}

            //// Save the uploaded file to "UploadedFiles" folder
            //file.SaveAs(fileSavePath);
            //string scheme = HttpContextAccessor.HttpContext.Request.Scheme;

            var a = parameter.MainUrl;

            try
            {
              var listProduct = (from p in _CoreContext.DbContext.Products
                               where p.Deleted == false
                               select new ListProductQueryEntity {
                               ProductId = p.ProductId,
                               Name=p.Name,
                               Description=p.Description,
                               Price= p.Price,
                               //Deleted=p.Deleted,
                               Photo =a + p.Photo
                                
                               }
                               ).ToList();
            return  new ListProductResponse { ListProduct = listProduct }  ;
            }
            catch (Exception e)
            {

                throw;
            }
           
        
        }



        public AddProductResponse AddProduct(IFormFile files ,  AddProductRequest parameter)
        {



            Product product = new Product();


            _CoreContext.DbContext.Products.Add(product);
            _CoreContext.DbContext.SaveChanges();
             
            return new AddProductResponse {   };

        }

    }
}
