namespace SolutionCore.Repositories
{

    using Arch.EntityFrameworkCore.UnitOfWork;
    using Microsoft.AspNetCore.Hosting;
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

    public class ProductQuery : RespositoryBase<Product> ,IProductQuery
    {

        private IHostingEnvironment hostingEnvironment;

        //private  IHttpContextAccessor HttpContextAccessor;


        IUnitOfWork<CoreContext> _CoreContext;
        public ProductQuery(IHostingEnvironment env, IUnitOfWork<CoreContext> CoreContext) : base(CoreContext.DbContext)
        {
            hostingEnvironment = env;
            _CoreContext = CoreContext;
        }


        public ListProductResponse ListProduct(ListProductRequest parameter)
        {

           var x = GetAsync(2009);

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
                                       Photo = p.Photo,
                                       PathUrlImage = $"{parameter.PathUrlImage}{p.Photo}"
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


        public EditProductResponse EditProduct(EditProductRequest parameter)
        {

            try
            {
                var Queryproduct = _CoreContext.DbContext.Products.FirstOrDefault(p =>
                                                         p.ProductId == parameter.ProductId &&
                                                         !p.Deleted);
                if (Queryproduct != null)
                {
                    Queryproduct.Name = parameter.Name;
                    Queryproduct.Description = parameter.Description;
                    Queryproduct.Price = parameter.Price;

                    if (parameter.files != null)
                    {
                        List<Product> lstProduct = new List<Product>();
                        var lstfileNames = ValidationFiles(parameter.files);
                        foreach (var nameFiles in lstfileNames)
                        {
                            Queryproduct.Photo = nameFiles;
                        }
                    }
                    _CoreContext.DbContext.Products.UpdateRange(Queryproduct);
                    _CoreContext.DbContext.SaveChanges();
                }

                return new EditProductResponse { };
            }
            catch (Exception ex)
            {

                throw;
            }

        }


        public List<string> ValidationFiles(List<IFormFile> files)
        {

            List<string> lstFileNames = new List<string>();

            if (files != null && files.Count >= 1)
            {

                if (!Directory.Exists(hostingEnvironment.WebRootPath + "\\images\\"))
                {
                    Directory.CreateDirectory(hostingEnvironment.WebRootPath + "\\images\\");
                }

                foreach (var file in files)
                {
                    var type = file.ContentType.Split('/');
                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    string extension = Path.GetExtension(file.FileName);
                    if (type[0] != "image")
                    {
                        throw new Exception("Solo se acepta archivos tipo imagenes");
                    }
                    fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;
                    var path = Path.Combine(hostingEnvironment.WebRootPath, "images", fileName);
                    using (Stream Stream = File.Create(path))
                    {
                        //crear el archiv
                        file.CopyTo(Stream);
                        Stream.Flush();
                    }
                    lstFileNames.Add(fileName);

                }
            }
            return lstFileNames;
        }

        public DeleteProductResponse DeleteProduct(DeleteProductRequest parameter)
        {

            var product = _CoreContext.DbContext.Products.Where(x => x.ProductId == parameter.ProductId
               && x.Deleted == false)
                .FirstOrDefault();

            if (product != null)
            {
                product.Deleted = true;
                _CoreContext.DbContext.Products.Update(product);
                _CoreContext.DbContext.SaveChanges();
            }
            return new DeleteProductResponse { };
        }
    }
}
