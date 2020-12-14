using Arch.EntityFrameworkCore.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using SolutionCore.Distributed_Processes.Dominio.Infrastructure.Data.Context;
using SolutionCore.Infraestructura.Transport.Core.Product.QueryEntity;
using SolutionCore.Infraestructura.Transport.Core.Product.Request;
using SolutionCore.Infraestructura.Transport.Core.Product.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SolutionCore.Api.DataAcces.Infrastructure.Data.CQS.Product.Query
{
   public class ProductQuery
    {


        IUnitOfWork<CoreContext> _CoreContext;
        public ProductQuery( IUnitOfWork<CoreContext>  CoreContext)
        {
            _CoreContext = CoreContext;
        }
        public ListProductResponse ListProduct(ListProductRequest  parameter ) {
            var listProduct = (from p in _CoreContext.DbContext.Products

                               select new ListProductQueryEntity {
                               ProductId = p.ProductId,
                               Name=p.Name,
                               Description=p.Description,
                               Price= p.Price,
                               Deleted=p.Deleted
                               }
                               ).ToList();
            return  new ListProductResponse { ListProduct = listProduct }  ;
        
        }

    }
}
