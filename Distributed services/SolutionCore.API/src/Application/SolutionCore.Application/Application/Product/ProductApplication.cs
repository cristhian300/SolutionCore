using SolutionCore.Application.Contracts.Contract.Product;
using SolutionCore.Infraestructura.Transport.Core.Product.Request;
using SolutionCore.Infraestructura.Transport.Core.Product.Response;
using SolutionCore.Infrastructure.Data.CQS.Authorization.Query;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Application.Application.Product
{
    public class ProductApplication : IProductContract
    {

        IProductQuery _IProductQuery;
        public ProductApplication(IProductQuery IProductQuery)
        {
            _IProductQuery = IProductQuery;
        }

        public Task<ListProductResponse> ListProduct(ListProductRequest parameter)
        {
            return Task.FromResult(_IProductQuery.ListProduct(parameter));
        }

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
    }
}
