import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NetworkManager } from 'src/app/agent/common/network-manager';
import { PostParameter } from 'src/app/agent/common/post-parameter';
import { StorageService } from '../common/storage.service';
import { ConfigurationResponse } from '../configuration/configuration';
import { ConfigurationService } from '../configuration/configuration.service';
import { GetTokenRequest, GetTokenResponse } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private configurationService: ConfigurationService,
    private storageService: StorageService,
    private networkManager: NetworkManager,
  ) { }

  login(parameter: GetTokenRequest): Observable<GetTokenResponse> {

    console.log("Empezo login");
    return new Observable<GetTokenResponse>(observer => {

      this.configurationService.getConfiguration().subscribe(
        (response: ConfigurationResponse) => {
          if (response) {
            this.storageService.store('configuration', response)

            const parameters = new PostParameter()
            parameters.PathOperation = response.coreUrl + 'Auth/Login'
            parameters.RequestParameter = parameter

            debugger
            const getTokenCall = this.networkManager.post(parameters);
            (getTokenCall as Observable<GetTokenResponse>).subscribe(getTokenResponse => {
              observer.next(getTokenResponse);
            }, error => {
              observer.next(error);
            });

          }

        }
      )

    });

  }
}
