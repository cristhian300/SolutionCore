using SolutionCore.Infrastructure.Transport.Core.Authorization.QueryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Infrastructure.Transport.Core.Authorization.Response
{
    public class ListUsuarioResponse
    {

        public List<ListUsuarioQueryEntity> ListUsuario { get; set; }
    }
}
