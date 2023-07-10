export class AddUsuarioRequest {
  nombreCompleto : string
  credencial: string
  clave: string

  deleted: boolean
  roleId?: number
}

export class ListUsuarioRequest{

  Credencial: string;

}

export class UpdateUsuarioRequest{


  usuarioId:number
  nombreCompleto : string
  credencial: string
  clave: string

  deleted: boolean
  roleId?: number
}

export class AddUsuarioResponse {

  usuarioId: number
}

export class ListRoleResponse {
  listRoles: ListRoleResult[];
}

export class ListRoleResult {
  value: number;
  description: string;
}

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

export class UpdateUsuarioResponse{

  usuarioId: number
}

export class ListRolesRequest{}
