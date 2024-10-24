using Microsoft.EntityFrameworkCore;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Context;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.share
{
    public class DataSeeder
    {

        public static void SeedCategory(CoreContext context)
        {
            if (!context.Categories.Any())
            {
                var categoria = new List<Category>
            {
                new Category { Name = "Sistemas",Description="Desarrollo" } 
            };
                context.AddRange(categoria);
                context.SaveChanges();
            }
        }
    }
}
