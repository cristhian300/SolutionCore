import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { MenuSideComponent } from '../../components/menu-side/menu-side.component';

const routes: Routes = [
 {
  path:'',
  component: MenuSideComponent,
  children:[
    {
       path:'dash',
       component:AdministradorComponent,
       data: {titulo:'dash'}
    }
  ]


 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
