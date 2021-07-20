using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Infrastructure.Transport.Core.Authorization.QueryEntity
{
    public class ListUsuarioQueryEntity
    {

        public int UsuarioId { get; set; }
        public string NombreCompleto { get; set; }
        public string Credencial { get; set; }
      
        public string Rol { get; set; }
    }
}
