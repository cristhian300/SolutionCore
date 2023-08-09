import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SPINNER } from 'ngx-ui-loader';
import { SystemStyleSheet } from './modules/enum/system-style-sheet';
import { GoogleApiService } from 'src/core/shared/common/services/services/oauth2/google/google-api.service';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { LocalStorageService } from 'src/core/shared/common/services/services/storage/local-storage.service';


const oauthConfig: AuthConfig = {
  issuer: 'https://login.microsoftonline.com/9b2f0c99-1ba7-412f-bc89-871cfb2d783a/v2.0',
  redirectUri: window.location.origin,
  clientId: 'a7074c5e-ece0-4de8-9c87-58f0b00e01a3',
  scope: 'openid profile email',
  requireHttps: false,
  strictDiscoveryDocumentValidation: false,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})



export class AppComponent {
  title = 'app';

  public SystemStyleSheet = SystemStyleSheet;
  public SPINNER = SPINNER;
  claims: object;


  /**
   *
   */
  constructor(
    // private readonly google:GoogleApiService
    // private readonly oauthService: OAuthService,
    // private  readonly  localStorageService: LocalStorageService
  ) {
    // this.oauthService.configure(oauthConfig);

    //  this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // if (window.location.pathname !== '/') {
    //   this.sessionStorageService.setItem('redirectURL', `${window.location.pathname}${window.location.search}`);
    // }

    // this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
    //   if (this.oauthService.hasValidAccessToken()) {
    //     this.claims = this.oauthService.getIdentityClaims();

    //     console.log('identity_user:', JSON.stringify(this.claims));
    //     console.log('token-oauth:', this.oauthService.getAccessToken());

    //     console.log("ruta",`${window.location.pathname}${window.location.search}`  );

    //   }
    // }
    // )

  }

}
