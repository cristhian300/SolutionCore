﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace SolutionCore.Api.DataAcces.Infrastructure.Data.Entities
{
    public partial class Usuario
    {
        public int UsuarioId { get; set; }
        public string NombreCompleto { get; set; }
        public string Credencial { get; set; }
        public string Clave { get; set; }
        public string Rol { get; set; }
        public bool Deleted { get; set; }
        public int? RoleId { get; set; }

        public virtual RolesUser Role { get; set; }
    }
}