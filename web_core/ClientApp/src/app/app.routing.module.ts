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
       path:'',
       loadChildren:()=> import('././main/molde/molde.module') .then(m => m.MoldeModule)
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
