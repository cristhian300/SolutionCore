using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace SolutionCore.Application.DTO.Product.Request
{
    public class AddProductDTO
    {


        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        //public DateTime? CreateDate { get; set; }
        //public DateTime? UpdatedDate { get; set; }
        //public bool Deleted { get; set; }
        //public string Photo { get; set; }
        public  IFormFile  files { get; set; }
    }
}
