



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

    public class ProductQuery: IProductQuery
    {

        private IHostingEnvironment hostingEnvironment;

       


        IUnitOfWork<CoreContext> _CoreContext;
        public ProductQuery(IHostingEnvironment env, IUnitOfWork<CoreContext>  CoreContext)
        {
            hostingEnvironment = env;
            _CoreContext = CoreContext;
        }


        public ListProductResponse ListProduct(ListProductRequest  parameter ) {

           //C:\\Users\\cristhian\\source\\repos\\copia2\\SolutionCore\\SolutionCore\\wwwroot\\images\\defaul_pamplonera.jpg
            var path = Path.Combine(hostingEnvironment.WebRootPath, "images", "defaul_pamplonera.jpg");
            

            //if (System.IO.File.Exists(fileSavePath))
            //{
            //    System.IO.File.Delete(fileSavePath);
            //}

            //// Save the uploaded file to "UploadedFiles" folder
            //file.SaveAs(fileSavePath);

            var listProduct = (from p in _CoreContext.DbContext.Products
                               where p.Deleted == false
                               select new ListProductQueryEntity {
                               ProductId = p.ProductId,
                               Name=p.Name,
                               Description=p.Description,
                               Price= p.Price,
                               Deleted=p.Deleted,
                               Photo = path
                               }
                               ).ToList();
            return  new ListProductResponse { ListProduct = listProduct }  ;
        
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
