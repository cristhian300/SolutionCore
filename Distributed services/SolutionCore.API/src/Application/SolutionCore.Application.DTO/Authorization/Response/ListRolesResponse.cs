using SolutionCore.Application.DTO.Authorization.QueryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Application.DTO.Authorization.Response
{
    public class ListRolesResponse
    {

        public List<RolesQueryEntity> ListRoles { get; set; }
    }
}
