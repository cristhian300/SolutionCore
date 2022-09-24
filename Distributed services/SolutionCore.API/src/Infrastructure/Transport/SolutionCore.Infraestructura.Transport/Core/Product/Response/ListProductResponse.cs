using SolutionCore.Infraestructura.Transport.Core.Product.QueryEntity;
using System;
using System.Collections.Generic;
using System.Text;

namespace SolutionCore.Infraestructura.Transport.Core.Product.Response
{
  public   class ListProductResponse
    {
        public List<ListProductQueryEntity> ListProduct { get; set; }
        
    }
}
