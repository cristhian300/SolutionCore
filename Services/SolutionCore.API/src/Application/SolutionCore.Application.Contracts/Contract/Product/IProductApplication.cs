using SolutionCore.Application.DTO.Product.QueryEntity;
using SolutionCore.Application.DTO.Product.Request;
using SolutionCore.Application.DTO.Product.Response.Product;
using System.Collections.Generic;
using System.Threading.Tasks;
using Transversal.Common;


namespace SolutionCore.Application.Contracts.Contract.Product
{
    public interface IProductApplication
    {

        Task<Response<List<ListProductDTO>>> ListProduct(ListProductRequest parameter);

        Task<Response<bool>> AddProduct(AddProductDTO parameter);


        Task<Response<bool>> EditProduct(EditProductDTO parameter);

        Task<Response<bool>> DeleteProduct(long productId);
        
    }
}
