import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from './common/storage.service';
import { ConfigurationResponse } from './configuration/configuration';
import { debug } from 'console';
import { ConfigurationService } from './configuration/configuration.service';
import { AppConfig, APP_CONFIG } from 'src/app/shared/appconfig/appconfig.module';
import { NetworkManager } from 'src/app/agent/common/network-manager';





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




  postRespuesta(parameterr: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    const options = { headers: headers };
    const parameters = JSON.stringify(parameterr)
    return this.http.post<any>(this.Url + 'Auth/ListUsuario', parameters, options);

  }







}
