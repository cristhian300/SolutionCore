import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListUsuarioRequest } from '../agent/User/request/ListUsuariosRequest';
import { NetworkManager } from '../agent/common/network-manager';
import { PostParameter } from '../agent/common/post-parameter';
import { ListUsuarioResponse } from '../agent/User/response/ListUsuarioResponse';
import { ListRoleResponse } from '../agent/User/response/ListRolesResponse';
import { ListRolesRequest } from '../agent/User/request/ListRolesRequest';
import { AddUsuarioRequest } from '../agent/User/request/AddUsuariosRequest';
import { AddUsuarioResponse } from '../agent/User/response/AddUsuarioResponse';
import { UpdateUsuarioRequest } from '../agent/User/request/UpdateUsuarioRequest';
import { GetTokenRequest } from '../agent/Authentication/request/GetTokenRequest';
import { GetTokenResponse } from '../agent/Authentication/response/GetTokenResponse';
import { AppConfig, APP_CONFIG } from '../shared/appconfig/appconfig.module';
import { StorageService } from './common/storage.service';
import { ConfigurationResponse } from './configuration/configuration';
import { debug } from 'console';
import { ConfigurationService } from './configuration/configuration.service';
import { AddProductRequest, EditProductRequest } from '../agent/Product copy/Request/AddProductRequest';
import { ListProductResponse } from '../agent/Product copy/Response/ListProductResponse';
import { AddProductResponse } from '../agent/Product copy/Response/AddProductResponse';




@Injectable({
  providedIn: 'root'
})
export class CoreService {

  ruta: string;
  storage: Storage;

  Url: string;
  constructor(private http: HttpClient,
    // @Inject('BASE_URL') baseUrl: string
    @Inject(APP_CONFIG) public config: AppConfig
    , private networkManager: NetworkManager,
    private storageService: StorageService

  ) {
    console.log("BASE_URL " + this.config.apiEndpoint);
    this.Url = (this.storageService.retrieve("configuration") as ConfigurationResponse).coreUrl
    console.log('recuperado pathMain', this.Url);

  }
  // port = '44378';
  // baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;

  redirectUrl: string;
  isAuthenticated = false;
  // Url: string = 'api/Auth/';
  //Url: string =   `${this.config.apiEndpoint}Auth/`  ;


  // Url: string = 'http://localhost:44342/api/Auth/'
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



  postRespuesta(parameterr: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const options = { headers: headers };
    const parameters = JSON.stringify(parameterr)
    return this.http.post<any>(this.Url + 'Auth/ListUsuario', parameters, options);

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

/*Product*/
public ListProduct(parameter:any = null){

  const parameters = new PostParameter()
  parameters.PathOperation= this.Url +  'Product/ListProduct'
  parameters.RequestParameter=parameter
  return this.networkManager.post(parameters)  as Observable<ListProductResponse>;

}

public AddProduct(parameter:AddProductRequest = null){

  const parameters = new PostParameter()
  parameters.PathOperation=  this.Url + 'Product/AddProduct'
  parameters.RequestParameter=parameter

  const formData = new FormData();
  for (const key in parameter) {
    if (parameter .hasOwnProperty(key)) {
      formData.append(key, parameter[key]);
    }
  }

  return this.networkManager.postFile(parameters,formData)  as Observable<AddProductResponse>;
}


public EditProduct(parameter:EditProductRequest = null){

  const parameters = new PostParameter()
  parameters.PathOperation= this.Url +  'Product/EditProduct'
  parameters.RequestParameter=parameter

  const formData = new FormData();
  for (const key in parameter) {
    if (parameter .hasOwnProperty(key)) {
      formData.append(key, parameter[key]);
    }
  }

  return this.networkManager.postFile(parameters,formData)  as Observable<AddProductResponse>;
}




}
