
using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
using SolutionCore.Application.DTO.Product.Request;
using SolutionCore.Application.DTO.Product.Response.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Repositories
{
    public interface IProductRepository: IRepositoryBase<Product>
    {
        Task<List<Product>> ListProduct(ListProductRequest parameter);

        Task<bool>   AddProduct(Product parameter);

        Task<bool> EditProduct(Product parameter);
       
        DeleteProductResponse DeleteProduct(DeleteProductRequest parameter);

    }
}
