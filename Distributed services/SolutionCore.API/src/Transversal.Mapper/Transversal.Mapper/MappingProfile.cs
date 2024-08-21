using AutoMapper;
using SolutionCore.Api.DataAcces.Infrastructure.Data.Entities;
using SolutionCore.Application.DTO.Product.QueryEntity;

namespace Transversal.Mapper
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            CreateMap<Product, ListProductDTO>().ReverseMap();
        }
    }
}
