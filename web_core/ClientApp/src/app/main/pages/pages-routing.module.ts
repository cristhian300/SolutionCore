import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuardGuard } from '../providers/guard/security-guard.guard';
import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from '../login/login.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { AlternativeComponent } from './alternative/alternative.component';
import { ClientContactComponent } from './task/client-contact/client-contact.component';



const routes: Routes = [

  {
    path: '',
    data: { breadCrumb: 'Ruta Principal' },
    children: [
      {
        // path: 'pages',
        path: 'usuarios', component: UsuariosComponent,
        // canActivate: [SecurityGuardGuard] ,
         data: { breadCrumb: 'User' }
      },
      { path: 'administrador', component: AdministradorComponent , data: { breadCrumb: 'Admin' }},
      // { path: 'molde', component: MoldePageComponent, data: { breadCrumb: 'Molde Maestro' },
      //  },
       { path: 'alterno', component: AlternativeComponent },
       { path: 'client-contact', component: ClientContactComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
