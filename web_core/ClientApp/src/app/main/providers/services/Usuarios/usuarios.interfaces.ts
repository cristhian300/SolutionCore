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

export interface AddUsuarioResponse {

  usuarioId: number
}

export interface ListRoleResponse {
  listRoles: ListRoleResult[];
}

export interface ListRoleResult {
  value: number;
  description: string;
}

export interface ListUsuarioResponse {
  listUsuarios: ListUsuarioResult[];
}

export interface  ListUsuarioResult {
  usuarioId: number;
  nombreCompleto: string;
  clave: string;
  // deleted  :boolean;
  roleId?: number;
  cc: string;
}

export class UpdateUsuarioResponse{

  usuarioId: number
}

export class ListRolesRequest{}
