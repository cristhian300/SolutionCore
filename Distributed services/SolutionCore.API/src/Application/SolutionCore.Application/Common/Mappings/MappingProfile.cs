using AutoMapper;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
using SolutionCore.Application.DTO.Product.QueryEntity;
using SolutionCore.Application.DTO.Product.Request;

namespace SolutionCore.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<Product, ListProductDTO>().ReverseMap();
            CreateMap<Product, AddProductDTO>().ReverseMap();
            CreateMap<Product, EditProductDTO>().ReverseMap();

        }
    }
}
