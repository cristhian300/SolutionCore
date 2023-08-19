import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main/layouts/main-layout/main-layout.component';
import { LoginComponent } from './main/login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthRoutingModule } from './node/auth/auth-routing.module';
import { BlankLayoutComponent } from './main/layouts/blank-layout/blank-layout.component';

const routes: Routes = [

  // { path: '', component: LoginComponent, pathMatch: 'full' },

  {
    path: '',
    children: [

      // {
      //   //flujo inicio
      //   path: '',
      //   component: BlankLayoutComponent,
      // },


      {
        //flujo Net core login
        path: '',
        component: BlankLayoutComponent,
        loadChildren:
          () => import('./main/login/login.module').then((m) => m.LoginModule)
      }

      ,
      {
        //flujo Net core pages
        path: '',
        component: MainLayoutComponent,
        loadChildren:
          () => import('./main/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        //****flujo home WEB_ME -->home
        path: '',
        loadChildren: () => import('././molde-maestro/molde.module').then(m => m.MoldeModule)
      },

      {
        //**** //flujo home WEB_ME aqui se esta dashboard
        path: '',
        loadChildren: () => import('././molde-maestro/config-dashboard/administrador/administrador.module').then(m => m.AdministradorModule)
      },

      {
        //ruta node_UD
        path: '',
        loadChildren: () => import('././node/auth/auth.module').then(m => m.AuthModule)
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
