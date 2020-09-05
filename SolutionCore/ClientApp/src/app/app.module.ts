import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UsuariosComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
   
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'usuarios', component: UsuariosComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [NetworkManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
