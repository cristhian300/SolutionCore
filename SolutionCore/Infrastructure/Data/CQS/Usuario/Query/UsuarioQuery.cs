using SolutionCore.Infrastructure.Data.Context;
using SolutionCore.Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SolutionCore.CQR.Query.Usuario
{
    public class UsuarioQuery
    {
       
        private  CoreContext _CoreContext;

        public UsuarioQuery(CoreContext  CoreContext)
        {
            _CoreContext = CoreContext;
        }

        public IQueryable GetUsuario( ) {

           var  _usuario = (from u in _CoreContext.Usuarios
                           
                           select new {
                               u.UsuarioId,
                               u.NombreCompleto
                           });
                           
             return _usuario;
        }
        
      
    }
}
