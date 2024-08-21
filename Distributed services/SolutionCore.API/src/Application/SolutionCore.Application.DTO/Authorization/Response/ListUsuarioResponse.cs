using SolutionCore.Infrastructure.Transport.Core.Authorization.QueryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Application.DTO.Authorization.Response
{
    public class ListUsuarioResponse
    {

        public List<ListUsuarioQueryEntity> ListUsuarios { get; set; }
    }
}
