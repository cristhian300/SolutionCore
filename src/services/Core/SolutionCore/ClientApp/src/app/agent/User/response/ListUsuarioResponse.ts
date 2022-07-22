   export class ListUsuarioResponse {
  listUsuarios: ListUsuarioEntity[];
}

export class  ListUsuarioEntity {
  usuarioId: number;
  nombreCompleto: string;
  credencial: string;
  rol?: any;
  deleted  :boolean
  roleId?: number;
  clave: string;
}