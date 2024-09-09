namespace SolutionCore.Repositories.Repositories
{
    using AutoMapper;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
    using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
    using SolutionCore.Application.DTO.Product.Request;
    using SolutionCore.Application.DTO.Product.Response.Product;
    using SolutionCore.Repositories.Persistence;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProductRepository : RespositoryBase<Product>, IProductRepository
    {

        private IHostingEnvironment hostingEnvironment;

        //private  IHttpContextAccessor HttpContextAccessor;
        private readonly IMapper _mapper;

         CoreContext  _CoreContext;
        public ProductRepository(IHostingEnvironment env,  CoreContext  CoreContext, IMapper mapper) : base(CoreContext)
        {
            hostingEnvironment = env;
            _CoreContext = CoreContext;
            _mapper = mapper;
        }


        public async Task<List<Product>> ListProduct(ListProductRequest parameter)
        {

            // //http://localhost:44342/images/
            var listProduct = await _CoreContext.Set<Product>()
           .Where(p => p.Deleted == false)
           //.ProjectTo<ListProductQueryEntity>(_mapper.ConfigurationProvider)
           .OrderByDescending(p => p.ProductId).AsNoTracking()
           .ToListAsync();
            return listProduct;
        }



        public async Task<bool> AddProduct(Product parameter)
        {

            //List<Product> lstProduct = new List<Product>();
            try
            {

           //     string nameFiles = ValidationFiles(parameter.files);
                //foreach (var nameFiles in lstfileNames)
                //{
                    //Product product = new Product
                    //{
                    //    Name = parameter.Name,
                    //    Description = parameter.Description,
                    //    Price = parameter.Price,
                    //    Photo = nameFiles

                    //};
                //    lstProduct.Add(product);
                //}

                _CoreContext. Products.Add(parameter);
               // _CoreContext.SaveChanges();

                return await Task.FromResult(true);
               // return new AddProductResponse { };
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

        }


        public async Task<bool> EditProduct(Product parameter)
        {

         
                var Queryproduct = _CoreContext.Products
                .AsNoTracking()
                .FirstOrDefault(p =>
                                                         p.ProductId == parameter.ProductId &&
                                                         !p.Deleted);
                if (Queryproduct != null)
                {
               

                 if(string.IsNullOrEmpty(parameter.Photo)) {
                    parameter.Photo = Queryproduct.Photo;

                    _CoreContext.Products.UpdateRange(parameter);
                    return await Task.FromResult(true);
                    }
                else
                {
                    _CoreContext.Products.UpdateRange(parameter);
                    return await Task.FromResult(true);
                }
    
              
                }
                return await Task.FromResult(false);
          

        }


        public  string  ValidationFiles(IFormFile fileItem)
        {

            // List<string> lstFileNames = new List<string>();

            string lstFileNames = "";

            if (fileItem != null )
            {

                if (!Directory.Exists(hostingEnvironment.WebRootPath + "\\images\\"))
                {
                    Directory.CreateDirectory(hostingEnvironment.WebRootPath + "\\images\\");
                }

                //foreach (var fileItem in files)
                //{
                    var type = fileItem.ContentType.Split('/');
                    
                     
                    if (type[0] != "image")
                    {
                        throw new Exception("Solo se acepta archivos tipo imagenes");
                    }
                    var  fileNameCreated = Path.GetFileNameWithoutExtension(fileItem.FileName) +
                        DateTime.Now.ToString("yymmssfff") + Path.GetExtension(fileItem.FileName);

                    var path = Path.Combine(hostingEnvironment.WebRootPath, "images", fileNameCreated);

                    using (Stream Stream = File.Create(path))
                    {
                        //crear el archiv
                        fileItem.CopyTo(Stream);
                        Stream.Flush();
                    }
                    lstFileNames =fileNameCreated ;

                //}
            }
            return lstFileNames;
        }

        public async Task< bool> DeleteProduct(long productId)
        {

            var product = await _CoreContext. Products.Where(x => x.ProductId == productId
            //   && x.Deleted == false
               )
                .FirstOrDefaultAsync();

            if (product != null)
            {
                product.Deleted = true;
                _CoreContext. Products.Update(product);
              return await Task.FromResult(true);
                //_CoreContext. SaveChanges();
            }
          return  await Task.FromResult(false);
        }

    }
}
