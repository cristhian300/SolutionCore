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
import { environment } from 'src/environments/environment';
import { ListProductResponse } from '../agent/Product/Response/ListProductResponse';
import { AddProductResponse } from '../agent/Product/Response/AddProductResponse';
import { AddProductRequest } from '../agent/Product/Request/AddProductRequest';



@Injectable({
  providedIn: 'root'
})
export class CoreService {

ruta:string ;
storage: Storage ;

  constructor(private http:HttpClient ,@Inject('BASE_URL') baseUrl: string ,private networkManager:NetworkManager) {

this.ruta = baseUrl
console.log( "BASE_URL " +this.ruta);
  }
  // port = '44378';
  // baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;

  redirectUrl: string;
  isAuthenticated = false;
  Url: string = 'api/Auth/';




ListUsuario( parameter: ListUsuarioRequest):Observable<ListUsuarioResponse>{

 const parameters = new PostParameter()
 parameters.PathOperation=  'api/Auth/ListUsuario'
 parameters.RequestParameter=parameter
 return this.networkManager.post(parameters)  as Observable<ListUsuarioResponse>;

}

ListRoles( parameter: ListRolesRequest):Observable<ListRoleResponse>{

  const parameters = new PostParameter()
  parameters.PathOperation=  'api/Auth/ListRoles'
  parameters.RequestParameter=parameter
  return this.networkManager.post(parameters)  as Observable<ListRoleResponse>;

 }



postRespuesta(parameterr: any): Observable<any> {
  const headers = new HttpHeaders({ 'content-type': 'application/json' });
  const options = { headers: headers };
  const parameters = JSON.stringify(parameterr)
  return this.http.post<any>(  'api/Auth/ListUsuario',  parameters   , options);

}

AddUsuario( parameter: AddUsuarioRequest):Observable<AddUsuarioResponse>{
  const parameters = new PostParameter()
  parameters.PathOperation=   'api/Auth/AddUsuario'
  parameters.RequestParameter=parameter
  return this.networkManager.post(parameters)  as Observable<AddUsuarioResponse>;
}

UpdateUsuario( parameter: UpdateUsuarioRequest):Observable<AddUsuarioResponse>{
  const parameters = new PostParameter()
  parameters.PathOperation=   'api/Auth/UpdateUsuario'
  parameters.RequestParameter=parameter
  return this.networkManager.post(parameters)  as Observable<AddUsuarioResponse>;
}


login(parameter:GetTokenRequest): Observable<GetTokenResponse> {


  console.log("Empezo login");
  return new Observable<GetTokenResponse>(observer => {


    const parameters = new PostParameter()
    parameters.PathOperation=    'api/Auth/Login'
    parameters.RequestParameter=parameter
    // return this.networkManager.post(parameters)  as Observable<GetTokenResponse>;
     console.log('Login :>> ', this.Url+ 'Login');
    const getTokenCall = this.networkManager.post(parameters);
    (getTokenCall as Observable<GetTokenResponse>).subscribe(getTokenResponse => {
        observer.next(getTokenResponse);
    }, error => {
        observer.next(error);
    });



  });

}

 /*Product*/
public ListProduct(parameter:any = null){

  const parameters = new PostParameter()
  parameters.PathOperation=   'api/Product/ListProduct'
  parameters.RequestParameter=parameter
  return this.networkManager.post(parameters)  as Observable<ListProductResponse>;

}

public AddProduct(parameter:AddProductRequest = null){

  const parameters = new PostParameter()
  parameters.PathOperation=   'api/Product/AddProduct'
  parameters.RequestParameter=parameter


  const formData = new FormData();
  formData.append('files', parameter.files);

  formData.append('Name', parameter.Name);
  formData.append('Description', parameter.Description);
  formData.append('Price', parameter.Price.toString());


  return this.networkManager.postFile(parameters,formData)  as Observable<AddProductResponse>;

}



}
