   export class ListUsuarioResponse {
  listUsuarios: ListUsuarioResult[];
}

export class  ListUsuarioResult {
  usuarioId: number;
  nombreCompleto: string;
  credencial: string;
  rol?: any;
  deleted  :boolean
  roleId?: number;
  clave: string;
}