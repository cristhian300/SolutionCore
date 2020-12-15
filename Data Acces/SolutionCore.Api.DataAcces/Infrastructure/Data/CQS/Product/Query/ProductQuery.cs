using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using SolutionCore.Distributed_Processes.Dominio.Infrastructure.Data.Context;
using SolutionCore.Infraestructura.Transport.Core.Product.QueryEntity;
using SolutionCore.Infraestructura.Transport.Core.Product.Request;
using SolutionCore.Infraestructura.Transport.Core.Product.Response;
using SolutionCore.Infrastructure.Data.CQS.Authorization.Query;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace SolutionCore.Api.DataAcces.Infrastructure.Data.CQS.Product.Query
{
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

           
            var path = Path.Combine(hostingEnvironment.WebRootPath, "images", "defaul_pamplonera.jpg");
            //C:\\Users\\cristhian\\source\\repos\\copia2\\SolutionCore\\SolutionCore\\wwwroot\\images\\defaul_pamplonera.jpg

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


       


    }
}
