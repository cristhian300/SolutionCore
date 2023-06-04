import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MoldePageComponent } from './pages/molde-page/molde-page.component';
import { AuthGuard } from 'src/app/node/guards/auth.guard';
import { MenuSideComponent } from './components/menu-side/menu-side.component';
import { PicturePortadaComponent } from './components/picture-portada/picture-portada.component';
import { HomePortadaComponent } from './pages/home-portada/home-portada.component';
import { AcordionMotionComponent } from './components/acordion-motion/acordion-motion.component';
import { PortadaMotionComponent } from './components/portada-motion/portada-motion.component';

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

  {
    path: '', component: MenuSideComponent,
    children: [
      { path: 'side', data: { titulo: 'side' } },
      { path: 'sombra', component: MoldePageComponent, data: { titulo: 'molde' } },
      { path: 'home', component: HomePortadaComponent, data: { titulo: 'home' } },
      { path: 'acordion', component: AcordionMotionComponent, data: { titulo: 'acordion' } },

    ]
  },

  {
    path: 'picture', component: PicturePortadaComponent,

  },
  {
    path: 'motion', component: PortadaMotionComponent, data: { titulo: 'motion' }
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoldeRoutingModule { }
