import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuardGuard } from '../providers/guard/security-guard.guard';
import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from '../login/login.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { ClientContactComponent } from './task/client-contact/client-contact.component';
import { IntegracionDocumentosComponent } from './task/integracion-documentos/integracion-documentos.component';
import { HomePortadaComponent } from './home-portada/home-portada.component';



const routes: Routes = [

  {
    path: '',
    data: { breadCrumb: 'Ruta Principal' },
    // canActivate:[SecurityGuardGuard],
    children: [
      {

        path: '', component: HomePortadaComponent,

      },

      {
        // path: 'pages',
        path: 'usuarios', component: UsuariosComponent,
        // canActivate: [SecurityGuardGuard] ,
         data: { breadCrumb: 'User' }
      },
      // { path: 'administrador', component: AdministradorComponent , data: { breadCrumb: 'Admin' }},
      // { path: 'molde', component: MoldePageComponent, data: { breadCrumb: 'Molde Maestro' },
      //  },

       { path: 'client-contact', component: ClientContactComponent },
       { path: 'integracion-doc', component: IntegracionDocumentosComponent },
       { path: 'home', component: HomePortadaComponent  },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
