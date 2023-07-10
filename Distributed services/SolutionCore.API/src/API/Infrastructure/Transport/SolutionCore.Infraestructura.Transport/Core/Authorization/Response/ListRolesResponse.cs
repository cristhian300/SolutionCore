using SolutionCore.Infrastructure.Transport.Core.Authorization.QueryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Infrastructure.Transport.Core.Authorization.Response
{
    public class ListRolesResponse
    {

        public List<RolesQueryEntity> ListRoles { get; set; }
    }
}
