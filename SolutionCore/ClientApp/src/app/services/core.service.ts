import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListUsuarioRequest } from '../agent/User/request/ListUsuariosRequest';
import { NetworkManager } from '../agent/common/network-manager';
import { PostParameter } from '../agent/common/post-parameter';
import { ListUsuarioResponse } from '../agent/User/response/ListUsuarioResponse';

 

@Injectable({
  providedIn: 'root'
})
export class CoreService {
 
ruta:string ;

  constructor(private http:HttpClient ,@Inject('BASE_URL') baseUrl: string ,private networkManager:NetworkManager) { 

this.ruta = baseUrl

  }
  // port = '44378';
  // baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;

  redirectUrl: string;
  isAuthenticated = false;
  Url: string = 'api/Auth/';




ListUsuario( parameter: ListUsuarioRequest):Observable<ListUsuarioResponse>{

 const parameters = new PostParameter()
 parameters.PathOperation= this.Url+ 'ListUsuario'
 parameters.RequestParameter=parameter
 return this.networkManager.post(parameters) as Observable<ListUsuarioResponse> ;

}


 

postRespuesta(parameterr: any): Observable<any> {
  const headers = new HttpHeaders({ 'content-type': 'application/json' });
  const options = { headers: headers };
  const parameters = JSON.stringify(parameterr)
  return this.http.post<any>( this.Url +'ListUsuario',  parameters   , options);
 
}


}
