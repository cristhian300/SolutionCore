import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './modules/web/home/home.component';
import { CounterComponent } from './modules/web/counter/counter.component';
import { FetchDataComponent } from './modules/web/fetch-data/fetch-data.component';
import { UsuariosComponent } from './modules/security/usuarios/usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NetworkManager } from './agent/common/network-manager';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalUsuariosComponent } from './modules/security/usuarios/modal-usuarios/modal-usuarios.component';
import { InterceptorService } from './agent/common/interceptor.service';
import { LoginComponent } from './modules/security/authentication/login/login.component';
import { SecurityGuardGuard } from './services/security/security-guard.guard';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AdministradorComponent } from './modules/web/administrador/administrador.component';
import { ModalProductComponent } from './modules/web/administrador/modal-product/modal-product.component';
import { ModalDeleteProductComponent } from './modules/web/administrador/modal-delete-product/modal-delete-product.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UsuariosComponent,
    ModalUsuariosComponent,
    LoginComponent,
    AdministradorComponent,
    ModalProductComponent,
    ModalDeleteProductComponent


  ],
  imports: [
    NgxUiLoaderModule.forRoot({}),
    PerfectScrollbarModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
   ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'usuarios', component: UsuariosComponent
      // ,canActivate:[SecurityGuardGuard]
    },
       { path: 'login', component: LoginComponent },
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
  entryComponents :[ModalUsuariosComponent,ModalProductComponent,ModalDeleteProductComponent]
})
export class AppModule { }
