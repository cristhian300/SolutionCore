import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkManager } from 'src/app/agent/common/network-manager';
import { PostParameter } from 'src/app/agent/common/post-parameter';
import { environment } from 'src/environments/environment.prod';

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
