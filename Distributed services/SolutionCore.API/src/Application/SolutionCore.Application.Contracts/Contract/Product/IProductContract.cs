using SolutionCore.Application.DTO.Product.QueryEntity;
using SolutionCore.Application.DTO.Product.Request;
using SolutionCore.Application.DTO.Product.Response.Product;
using System.Collections.Generic;
using System.Threading.Tasks;
using Transversal.Common;


namespace SolutionCore.Application.Contracts.Contract.Product
{
    public interface IProductContract
    {

        Task<Response<List<ListProductDTO>>> ListProduct(ListProductRequest parameter);

        Task<AddProductResponse> AddProduct(AddProductRequest parameter);


        Task<EditProductResponse> EditProduct(EditProductRequest parameter);

        Task<DeleteProductResponse> DeleteProduct(DeleteProductRequest parameter);
        
    }
}
