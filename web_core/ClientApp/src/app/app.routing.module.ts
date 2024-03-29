import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main/layouts/main-layout/main-layout.component';
import { LoginComponent } from './main/login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthRoutingModule } from './node/auth/auth-routing.module';

const routes: Routes = [

  // { path: '', component: LoginComponent, pathMatch: 'full' },

  {
    path: '',
    children: [
      {
        path: '',
        loadChildren:
          () => import('./main/login/login.module').then((m) => m.LoginModule)
      }
      ,
      {
        path: '',
        component: MainLayoutComponent,
        loadChildren:
          () => import('./main/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        //****aqui se esta armando
       path:'',
       loadChildren:()=> import('././main/molde-maestro/molde.module') .then(m => m.MoldeModule)
      },

      {
        //****aqui se esta dashboard
       path:'',
       loadChildren:()=> import('././main/molde-maestro/config-dashboard/administrador/administrador.module') .then(m => m.AdministradorModule)
      },

      {
        path:'',
        loadChildren:()=> import('././node/auth/auth.module') .then(m => m.AuthModule)
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
