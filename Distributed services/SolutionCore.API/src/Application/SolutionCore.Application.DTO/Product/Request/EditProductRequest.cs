using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace SolutionCore.Application.DTO.Product.Request
{
    public class EditProductRequest
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }

        public List<IFormFile> files { get; set; }
    }
}
