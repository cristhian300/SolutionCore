import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NetworkManager } from './agent/common/network-manager';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InterceptorService } from './main/providers/interceptor/interceptor.service';
import { LoginComponent } from './main/pages/login/login.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AppconfigModule } from './shared/appconfig/appconfig.module';
import { AdministradorComponent } from './main/pages/administrador/administrador.component';
import { ModalProductComponent } from './main/pages/administrador/modal-product/modal-product.component';
import { ModalDeleteProductComponent } from './main/pages/administrador/modal-delete-product/modal-delete-product.component';
import { UsuariosComponent } from './main/pages/usuarios/usuarios.component';
import { ModalUsuariosComponent } from './main/pages/usuarios/modal-usuarios/modal-usuarios.component';
import { SecurityGuardGuard } from './main/providers/guard/security-guard.guard';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UsuariosComponent,
    LoginComponent,
    AdministradorComponent,
    ModalProductComponent,
    ModalDeleteProductComponent,
    ModalUsuariosComponent
  ],
  imports: [
    NgxUiLoaderModule.forRoot({}),
    PerfectScrollbarModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppconfigModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([

      { path: '', component: LoginComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      {
        path: 'usuarios', component: UsuariosComponent
        , canActivate: [SecurityGuardGuard]
      },
      { path: 'log', component: LoginComponent },
      { path: 'administrador', component: AdministradorComponent }
    ]),
    BrowserAnimationsModule

  ],
  providers: [NetworkManager,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalUsuariosComponent
    ,ModalProductComponent,ModalDeleteProductComponent
  ]
})
export class AppModule { }
