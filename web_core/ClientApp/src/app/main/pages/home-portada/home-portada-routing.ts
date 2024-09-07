import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePortadaComponent } from './home-portada.component';

const routes: Routes = [

  {
    path: '',
    data: { breadCrumb: 'Ruta Principal' },
    children: [
      {
        path: '',
        component: HomePortadaComponent,
        data: { titulo: 'Home' }
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePortadaRoutingModule { }
