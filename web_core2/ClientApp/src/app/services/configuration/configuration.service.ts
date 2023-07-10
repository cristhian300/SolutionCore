import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkManager } from '../../agent/common/network-manager';
import { PostParameter } from '../../agent/common/post-parameter';
import { ConfigurationResponse } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configurationUrl: string;
  constructor(private networkManager: NetworkManager) {

    this.configurationUrl = this.getBaseUrl();

  }

  public getBaseUrl() {
    const base = document.getElementsByTagName('base')[0].href;
    return base.endsWith('/') ? base : `${base}/`;
  }


  public getConfiguration():Observable<ConfigurationResponse> {
    const request = new PostParameter();
    request.PathOperation = this.configurationUrl + 'api/v1/Configuration/GetConfiguration'
    request.RequestParameter = null
    return  this.networkManager.post(request);
  }

}
