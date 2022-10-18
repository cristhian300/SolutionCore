import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NetworkManager } from 'src/app/agent/common/network-manager';
import { PostParameter } from 'src/app/agent/common/post-parameter';
import { ApiService } from 'src/core/shared/common/services/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { StorageService } from '../common/storage.service';
import { ConfigurationResponse } from '../configuration/configuration';
import { ConfigurationService } from '../configuration/configuration.service';
import { LoginRequest, GetTokenResponse } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private urlLogin:string;

  constructor(private configurationService: ConfigurationService,
    private storageService: StorageService,
    private networkManager: NetworkManager,
    private apiService: ApiService
  ) {
       this.urlLogin = environment.apiEndpoint+'core/api/'

    }

  login(parameter: LoginRequest): Observable<GetTokenResponse> {

    console.log("Empezo login");
    return     this.apiService.post(this.urlLogin + 'Auth/Login', parameter);
    // new Observable<GetTokenResponse>(observer => {

    //   this.configurationService.getConfiguration().subscribe(
    //     (response: ConfigurationResponse) => {
    //       if (response) {
    //         this.storageService.store('configuration', response)

    //         const getTokenCall = this.apiService.post(response.coreUrl + 'Auth/Login', parameter);
    //         (getTokenCall as Observable<GetTokenResponse>).subscribe(getTokenResponse => {
    //           observer.next(getTokenResponse);
    //         }, error => {
    //           observer.next(error);
    //         });
    //       }
    //     }
    //   )
    // });

  }

}
