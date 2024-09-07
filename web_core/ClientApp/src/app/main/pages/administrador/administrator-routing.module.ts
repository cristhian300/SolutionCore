import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { MoldePageComponent } from '../molde-page/molde-page.component';


const routes: Routes = [
 {
  path:'',
  children:[
    {path:'',component: AdministradorComponent},
    {path:'molde',component: MoldePageComponent},

  ]
 }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
