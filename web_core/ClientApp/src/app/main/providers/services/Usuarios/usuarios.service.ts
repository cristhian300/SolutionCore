import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkManager } from 'src/app/agent/common/network-manager';
import { PostParameter } from 'src/app/agent/common/post-parameter';
import { environment } from 'src/environments/environment.prod';
import { StorageService } from '../common/storage.service';
import { ConfigurationResponse } from '../configuration/configuration';
import { AddUsuarioRequest, AddUsuarioResponse, ListRoleResponse, ListRolesRequest, ListUsuarioRequest, ListUsuarioResponse, UpdateUsuarioRequest } from './usuarios.interfaces';
import { ApiService } from 'src/core/shared/common/services/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  Url: string;

  constructor(private networkManager: NetworkManager,
    private storageService: StorageService,
    private apiService: ApiService
    ) {

    // this.Url = (this.storageService.retrieve("configuration") as ConfigurationResponse).coreUrl
    this.Url = environment.apiEndpoint+'/core/api/'
  }


  ListUsuario(parameter: ListUsuarioRequest): Observable<ListUsuarioResponse> {

    // const parameters = new PostParameter()
    // parameters.PathOperation = this.Url + 'Auth/ListUsuario'
    // parameters.RequestParameter = parameter
    // return this.networkManager.post(parameters) as Observable<ListUsuarioResponse>;
    return this.apiService.post(this.Url + 'Auth/ListUsuario',parameter)
  }

  ListRoles(parameter: ListRolesRequest): Observable<ListRoleResponse> {

    // const parameters = new PostParameter()
    // parameters.PathOperation = this.Url + 'Auth/ListRoles'
    // parameters.RequestParameter = parameter
    // return this.networkManager.post(parameters) as Observable<ListRoleResponse>;
    return this.apiService.post(this.Url + 'Auth/ListRoles',parameter)
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
