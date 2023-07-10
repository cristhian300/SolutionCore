using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolutionCore.Infrastructure.Transport.Core.Authorization.Request
{
    public class AddUsuarioRequest
    {
        public string NombreCompleto { get; set; }
        public string Credencial { get; set; }
        public string Clave { get; set; }
        //public string Rol { get; set; }
        public bool Deleted { get; set; }
        public int? RoleId { get; set; }
    }
}
