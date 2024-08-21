using AutoMapper;
using SolutionCore.Application.Contracts.Contract.Product;
using SolutionCore.Application.DTO.Product.QueryEntity;
using SolutionCore.Application.DTO.Product.Request;
using SolutionCore.Application.DTO.Product.Response.Product;
using SolutionCore.Repositories;

using Transversal.Common;

namespace SolutionCore.Application.Application.Product
{
    public class ProductApplication : IProductContract
    {

        IProductRepository _IProductQuery;
        private readonly IMapper _mapper;
        public ProductApplication(IProductRepository IProductQuery, IMapper mapper)
        {
            _IProductQuery = IProductQuery;
            _mapper = mapper;
        }

        //public async Task<Response<List<ListProductDTO>>> ListProduct(ListProductRequest parameter)
        //{
        //     var result = new Response<List<ListProductDTO>>();



        //    return _IProductQuery.ListProduct(parameter) ;
        //}

        public Task<AddProductResponse> AddProduct(AddProductRequest parameter)
        {

            return Task.FromResult(_IProductQuery.AddProduct(parameter));
        }

        public Task<EditProductResponse> EditProduct(EditProductRequest parameter)
        {
            return Task.FromResult(_IProductQuery.EditProduct(parameter));
        }

        public Task<DeleteProductResponse> DeleteProduct(DeleteProductRequest parameter)
        {
            return Task.FromResult(_IProductQuery.DeleteProduct(parameter));
        }

        public async Task<Response<List<ListProductDTO>>> ListProduct(ListProductRequest parameter)
        {
            var response = new Response<List<ListProductDTO>>();

            try
            {
                

                var listProduct = await _IProductQuery.ListProduct(parameter);
                response.Data = _mapper.Map<List<ListProductDTO>>(listProduct);
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
    }
}
