import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkManager } from 'src/app/agent/common/network-manager';
import { PostParameter } from 'src/app/agent/common/post-parameter';
import { StorageService } from '../common/storage.service';
import { ConfigurationResponse } from '../configuration/configuration';
import { AddUsuarioRequest, AddUsuarioResponse, ListRoleResponse, ListRolesRequest, ListUsuarioRequest, ListUsuarioResponse, UpdateUsuarioRequest } from './usuarios.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  Url: string;

  constructor(private networkManager: NetworkManager,
    private storageService: StorageService) {

    this.Url = (this.storageService.retrieve("configuration") as ConfigurationResponse).coreUrl
  }


  ListUsuario(parameter: ListUsuarioRequest): Observable<ListUsuarioResponse> {

    const parameters = new PostParameter()
    parameters.PathOperation = this.Url + 'Auth/ListUsuario'
    parameters.RequestParameter = parameter
    return this.networkManager.post(parameters) as Observable<ListUsuarioResponse>;

  }

  ListRoles(parameter: ListRolesRequest): Observable<ListRoleResponse> {

    const parameters = new PostParameter()
    parameters.PathOperation = this.Url + 'Auth/ListRoles'
    parameters.RequestParameter = parameter
    return this.networkManager.post(parameters) as Observable<ListRoleResponse>;

  }

  AddUsuario(parameter: AddUsuarioRequest): Observable<AddUsuarioResponse> {
    const parameters = new PostParameter()
    parameters.PathOperation = this.Url + 'Auth/AddUsuario'
    parameters.RequestParameter = parameter
    return this.networkManager.post(parameters) as Observable<AddUsuarioResponse>;
  }

  UpdateUsuario(parameter: UpdateUsuarioRequest): Observable<AddUsuarioResponse> {
    const parameters = new PostParameter()
    parameters.PathOperation = this.Url + 'Auth/UpdateUsuario'
    parameters.RequestParameter = parameter
    return this.networkManager.post(parameters) as Observable<AddUsuarioResponse>;
  }


}
