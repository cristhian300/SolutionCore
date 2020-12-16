using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace SolutionCore.Infraestructura.Transport.Core.Product.Request
{
   public class AddProductRequest
    {


        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        //public DateTime? CreateDate { get; set; }
        //public DateTime? UpdatedDate { get; set; }
        //public bool Deleted { get; set; }
        //public string Photo { get; set; }
        public List<IFormFile> files  { get; set; }
    }
}
