import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NetworkManager } from './main/providers/legacy-agent/network-manager';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InterceptorService } from './main/providers/interceptor/interceptor.service';
import { LoginComponent } from './main/login/login.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppconfigModule } from './shared/appconfig/appconfig.module';
import { SecurityGuardGuard } from './main/providers/guard/security-guard.guard';
import { ApiService } from 'src/core/shared/common/services/services/api/api.service';
import { AppRoutingModule } from './app.routing.module';
import { MainLayoutModule } from './main/layouts/main-layout/main-layout.module';

// import { HeaderComponent } from './main/layouts/header/header.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { BlankLayoutModule } from './main/layouts/blank-layout/blank-layout.module';
import { NgbModule,NgbCarouselModule  } from '@ng-bootstrap/ng-bootstrap';



// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: false
// };


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    NgxUiLoaderModule.forRoot({}),
    PerfectScrollbarModule,
    FlexLayoutModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    OAuthModule.forRoot(),
    AppconfigModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainLayoutModule,
    BlankLayoutModule,

    NgbModule,
    NgbCarouselModule,

  ],
  providers: [NetworkManager, ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },


    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // }


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
