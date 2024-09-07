import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main/layouts/main-layout/main-layout.component';
import { LoginComponent } from './main/login/login.component';

import { AuthRoutingModule } from './node/auth/auth-routing.module';
import { BlankLayoutComponent } from './main/layouts/blank-layout/blank-layout.component';
import { MenuSideComponent } from 'src/core/ui/component/menu-side/menu-side.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    //flujo Net core Login
    path: 'auth',
    //component define el template de paginas a rutear
    component: BlankLayoutComponent,
    loadChildren:
      () => import('./main/login/login.module').then((m) => m.LoginModule)
  },
  {
    //flujo Net core pages login -> /
    path: 'home',
    // component: MainLayoutComponent,
    component: MenuSideComponent,
    loadChildren:
      () => import('./main/pages/home-portada/home-portada.module').then((m) => m.HomePortadaModule)
  },


  {
    //flujo Net core pages login -> /
    path: 'admin',
    // component: MainLayoutComponent,
    component: MenuSideComponent,
    loadChildren:
      () => import('./main/pages/administrador/administrator.module').then((m) => m.AdministratorModule)
  },


  // {
  //   //****flujo home WEB_ME -->home
  //   path: '',
  //   loadChildren: () => import('././molde-maestro/molde.module').then(m => m.MoldeModule)
  // },

  // {
  //   //**** //flujo home WEB_ME aqui se esta dashboard -> dash
  //   path: '',
  //   loadChildren: () => import('././molde-maestro/config-dashboard/administrador/administrador.module')
  //     .then(m => m.AdministradorModule)
  // },

  {
    //ruta node_UD (login node) --> node
    path: '',
    loadChildren: () => import('././node/auth/auth.module').then(m => m.AuthModule)
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes),],

  exports: [RouterModule]
})
export class AppRoutingModule { }
