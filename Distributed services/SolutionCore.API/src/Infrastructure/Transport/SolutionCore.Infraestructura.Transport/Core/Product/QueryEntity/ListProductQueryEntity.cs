using System;
using System.Collections.Generic;
using System.Text;

namespace SolutionCore.Infraestructura.Transport.Core.Product.QueryEntity
{
   public class ListProductQueryEntity
    {

        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool Deleted { get; set; }

        public string  Photo { get; set; }

        public string PathUrlImage { get; set; }
    }
}
