import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { NetworkManager } from '../../agent/common/network-manager';
import { PostParameter } from '../../agent/common/post-parameter';
import { ConfigurationResponse } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configurationUrl: string;
  url:string;
  constructor(private networkManager: NetworkManager) {

    this.configurationUrl = this.getBaseUrl();
    this.url= environment.apiEndpoint
  }

  public getBaseUrl() {
    const base = document.getElementsByTagName('base')[0].href;
    return base.endsWith('/') ? base : `${base}/`;
  }


  public getConfiguration():Observable<ConfigurationResponse> {
    const request = new PostParameter();
    request.PathOperation = this.url + 'api/v1/Configuration/GetConfiguration'
    request.RequestParameter = null
    return  this.networkManager.post(request);
  }

}
