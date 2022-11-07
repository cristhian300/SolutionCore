import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuardGuard } from '../providers/guard/security-guard.guard';
import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from '../login/login.component';
import { MoldePageComponent } from './molde-page/molde-page.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        children: [
          {
            // path: 'pages',
            path: '',
            children: [
              {
                path: 'usuarios', component: UsuariosComponent,
                canActivate: [SecurityGuardGuard]
              },

              { path: 'administrador', component: AdministradorComponent },
              { path: 'molde', component: MoldePageComponent }
            ]

          }
        ]
      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
