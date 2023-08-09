import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Console } from 'console';


const oauthConfig: AuthConfig = {
  issuer: 'https://accounts.google',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '631666904158-chd1jhu72d4s4vb38rcdr7uvosj8uiam.apps.googleusercontent.com',
  scope: 'openid profile email',
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {



  constructor(private readonly oauthService: OAuthService) {

    oauthService.configure(oauthConfig);
    oauthService.loadDiscoveryDocument().then(() => {
      oauthService.tryLoginImplicitFlow().then(() => {

        if (!oauthService.hasValidAccessToken()) {
          oauthService.initLoginFlow()

        }
        else {
          oauthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile));

          })
        }
      })
    })

  }
}
