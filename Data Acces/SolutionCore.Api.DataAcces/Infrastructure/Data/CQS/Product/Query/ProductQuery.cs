



namespace SolutionCore.Api.DataAcces.Infrastructure.Data.CQS.Product.Query
{

    using Arch.EntityFrameworkCore.UnitOfWork;
    using Microsoft.AspNetCore.Hosting;

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
    using SolutionCore.Infraestructura.Transport.Core.Product.Response;
    using SolutionCore.Infraestructura.Transport.Core.Product.QueryEntity;
    using SolutionCore.Infraestructura.Transport.Core.Product.Request;
    using System.Collections.Generic;


    public class ProductQuery : IProductQuery
    {

        private IHostingEnvironment hostingEnvironment;

        //private  IHttpContextAccessor HttpContextAccessor;


        IUnitOfWork<CoreContext> _CoreContext;
        public ProductQuery(
            //IHttpContextAccessor httpContextAccessor,


            IHostingEnvironment env, IUnitOfWork<CoreContext> CoreContext)
        {
            //HttpContextAccessor = httpContextAccessor;
            hostingEnvironment = env;
            _CoreContext = CoreContext;
        }


        public ListProductResponse ListProduct(ListProductRequest parameter)
        {

            try
            {
                var listProduct = (from p in _CoreContext.DbContext.Products
                                   where p.Deleted == false
                                   orderby p.ProductId descending
                                   select new ListProductQueryEntity
                                   {
                                       ProductId = p.ProductId,
                                       Name = p.Name,
                                       Description = p.Description,
                                       Price = p.Price,
                                       Photo = p.Photo
                                   }
                                 ).ToList();
                return new ListProductResponse { ListProduct = listProduct };
            }
            catch (Exception e)
            {
                throw;
            }

        }



        public AddProductResponse AddProduct(AddProductRequest parameter)
        {

            List<Product> lstProduct = new List<Product>();
            try
            {

                var lstfileNames = ValidationFiles(parameter.files);
               

                foreach (var nameFiles in lstfileNames)
                {
                    Product product = new Product
                    {
                        Name = parameter.Name,
                        Description = parameter.Description,
                        Price = parameter.Price,
                        Photo = nameFiles

                    };
                    lstProduct.Add(product);
                }

                _CoreContext.DbContext.Products.AddRange(lstProduct);
                _CoreContext.SaveChanges();

                return new AddProductResponse { };
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

        }


        public AddProductResponse EditProduct(AddProductRequest parameter)
        {
            List<Product> lstProduct = new List<Product>();
            var lstfileNames = ValidationFiles(parameter.files);

            foreach (var item in lstfileNames)
            {
                Product product = new Product()
                {
                    Name = parameter.Name,
                    Description = parameter.Description,
                    Photo = "detalle"
                };
                lstProduct.Add(product);
            }
           
            _CoreContext.DbContext.Products.UpdateRange(lstProduct);
            _CoreContext.DbContext.SaveChanges();
            return new AddProductResponse { };
        }


        public List<String> ValidationFiles(List<IFormFile> files)
        {

            List<String> lstFileNames = new List<String>();

            if (files.Count >= 1)
            {

                if (!Directory.Exists(hostingEnvironment.WebRootPath + "\\images\\"))
                {
                    Directory.CreateDirectory(hostingEnvironment.WebRootPath + "\\images\\");
                }

                foreach (var file in files)
                {
                    var type = file.ContentType.Split('/');

                    if (type[0] != "image")
                    {
                        throw new Exception("Solo se acepta archivos tipo imagenes");
                    }
                    var path = Path.Combine(hostingEnvironment.WebRootPath, "images", file.FileName);
                    using (Stream Stream = System.IO.File.Create(path))
                    {
                        //crear el archiv
                        file.CopyToAsync(Stream);
                        Stream.Flush();
                    }
                    lstFileNames.Add(file.FileName);

                }
            }
            return lstFileNames;
        }
    }
}
