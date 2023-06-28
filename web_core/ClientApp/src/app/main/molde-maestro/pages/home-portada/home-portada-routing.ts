import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { HomePortadaComponent } from './home-portada.component';

const routes: Routes = [

  {
    path: '',

    children: [
      {
        path: '',
        component: HomePortadaComponent,
        data: { titulo: 'Home' }
      },
      {
        path: 'products',
        component: ProductsHomeComponent,
        data: { titulo: 'products' }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePortadaRoutingModule { }
