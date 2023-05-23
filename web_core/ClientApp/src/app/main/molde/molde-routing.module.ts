import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MoldePageComponent } from './molde-page/molde-page.component';
import { AuthGuard } from 'src/app/node/guards/auth.guard';
import { MenuSideComponent } from './menu-side/menu-side.component';
import { PicturePortadaComponent } from './picture-portada/picture-portada.component';
import { HomePortadaComponent } from './home-portada/home-portada.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'menu', data: { titulo: 'menu' } },

      { path: 'molde', component: MoldePageComponent, data: { titulo: 'molde' } },
    ]
  },
  { path: '', component: MenuSideComponent ,
  children:[
    { path: 'side', data: { titulo: 'side' } },
    { path: 'sombra', component: MoldePageComponent, data: { titulo: 'molde' } },
    { path: 'homep', component: HomePortadaComponent, data: { titulo: 'homeP' } },
  ]},
  {
    path:'picture',component:PicturePortadaComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoldeRoutingModule { }
