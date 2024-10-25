using Arch.EntityFrameworkCore.UnitOfWork;
using AutoMapper;
using EventBus.Messages.Events;
using IdentityModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
using SolutionCore.Application.DTO.Product.QueryEntity;
using SolutionCore.Application.DTO.Product.Request;
using SolutionCore.Application.DTO.Product.Response.Product;
using SolutionCore.Application.Interface.Contract.Product;
using SolutionCore.Application.Interface.InfraestructuraEventBus;
using SolutionCore.Repositories.Persistence;
using System;
using System.Linq.Expressions;
using Transversal.Common;

namespace SolutionCore.Application.Application.Products
{
    public class ProductApplication : IProductApplication
    {
        private IHostingEnvironment _hostingEnvironment;
        IProductRepository _IProductQuery;
        IUnitOfWork<CoreContext> _unitOfWork;
        private IEventBus _eventBus;

        private readonly IMapper _mapper;
        public ProductApplication(IProductRepository IProductQuery, IMapper mapper,
            IHostingEnvironment hostingEnvironment    ,
            IUnitOfWork<CoreContext> unitOfWork   
           , IEventBus eventBus 
            )
        {
            _IProductQuery = IProductQuery;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
            _unitOfWork = unitOfWork;
            _eventBus = eventBus;
        }



        public async Task<Response<bool>> AddProduct(AddProductDTO parameter)
        {
            var response = new Response<bool>();

            try
            {
                string Photo = ValidationFiles(parameter.files);
                var product = _mapper.Map<Product>(parameter);
                product.Photo = Photo;

                await _IProductQuery.AddProduct(product);
                response.Data = _unitOfWork.SaveChanges() > 0;

                if (response.Data)
                {
                    response.IsSuccess = true;
                    response.Message = "Registro Exitoso!!!";


                    //var productCreatedEvent = _mapper.Map<ProductCreateEvent>(product);
                    //_eventBus.Publish(productCreatedEvent);
                }
            }
            catch (Exception ex)
            {

                response.Message = ex.Message;
            }
            

            return response;
        }

      

        public async Task<Response<bool>> EditProduct(EditProductDTO parameter)
        {


            var response = new Response<bool>();
            try
            {
                
                string Photo = ValidationFiles(parameter.files);
                var entity = _mapper.Map<Product>(parameter);
                entity.Photo = Photo;

                await _IProductQuery.EditProduct(entity);
                response.Data = _unitOfWork.SaveChanges() > 0;

                    if (response.Data)
                    {

                        response.IsSuccess = true;
                        response.Message = "Actualización Exitosa!!!";
                    }
                
            }
            catch (Exception e)
            {

                response.Message = e.Message;
            }
            return response;  
        }

        public async Task<Response<bool>> DeleteProduct(long productId)
        {

            var response = new Response<bool>();

            try
            {
               await _IProductQuery.DeleteProduct(productId);
                response.Data = _unitOfWork.SaveChanges()>0;
                if (response.Data) {
                    response.IsSuccess = true;
                    response.Message = "Eliminacion Exitosa!!!";
                }


            }
            catch (Exception e )
            {

                response.Message = e.Message;
            }

            return response;
        }

        public async Task<Response<List<ListProductDTO>>> ListProduct(ListProductRequest parameter)
        {
            var response = new Response<List<ListProductDTO>>();

            try
            {
 
                Expression<Func<Product, bool>>
                predicate =  (p) => p.Deleted == false;  
 
               // var listProduct = await _IProductQuery.GetAllWhereAsync(predicate);
                 var listProduct  = await _IProductQuery.ListProduct(parameter);
                response.Data = _mapper.Map<List<ListProductDTO>>(listProduct.OrderByDescending(x => x.ProductId));
                foreach (var p in response.Data)
                {
                    p.PathUrlImage = $"{parameter.PathUrlImage}{p.Photo}";
                }

                if (response.Data != null)
                {
                    response.IsSuccess = true;
                    response.Message = "Consulta Exitosa!!!";
                }
            }
            catch (Exception e)
            {
                response.IsSuccess = false;
                response.Message = e.Message;
            }
            
            return response;
        }


        public string ValidationFiles(IFormFile fileItem)
        {

            // List<string> lstFileNames = new List<string>();

            string lstFileNames = "";
            if (fileItem != null)
            {

                if (!Directory.Exists(_hostingEnvironment.WebRootPath + "\\images\\"))
                {
                    Directory.CreateDirectory(_hostingEnvironment.WebRootPath + "\\images\\");
                }

                //foreach (var fileItem in files)
                //{
                var type = fileItem.ContentType.Split('/');


                if (type[0] != "image")
                {
                    throw new Exception("Solo se acepta archivos tipo imagenes");
                }
                var fileNameCreated = Path.GetFileNameWithoutExtension(fileItem.FileName) +
                    DateTime.Now.ToString("yymmssfff") + Path.GetExtension(fileItem.FileName);

                var path = Path.Combine(_hostingEnvironment.WebRootPath, "images", fileNameCreated);

                using (Stream Stream = File.Create(path))
                {
                    //crear el archiv
                    fileItem.CopyTo(Stream);
                    Stream.Flush();
                }
                lstFileNames = fileNameCreated;

                //}
            }
            return lstFileNames;
        }
    }
}
