﻿
using SolutionCore.Infraestructura.Transport.Core.Product.Request;
using SolutionCore.Infraestructura.Transport.Core.Product.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SolutionCore.Application.Contracts.Contract.Product
{
   public interface IProductContract
    {

        Task<ListProductResponse> ListProduct(ListProductRequest parameter);

        Task<AddProductResponse> AddProduct(AddProductRequest parameter);


        Task<EditProductResponse> EditProduct(EditProductRequest parameter);

        Task<DeleteProductResponse> DeleteProduct(DeleteProductRequest parameter);
        
    }
}
