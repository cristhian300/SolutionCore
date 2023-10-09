import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePortadaRoutingModule } from './home-portada-routing';
import { HomePortadaComponent } from './home-portada.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ListProductHomeComponent } from '../../components/list-product-home/list-product-home.component';
import { CarouselPortadaComponent } from '../../components/carousel-portada/carousel-portada.component';
import { FooterModelComponent } from '../../components/footer-model/footer-model.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomePortadaComponent,
    ProductsHomeComponent,

    //componentes compartidos
    ListProductHomeComponent,
    CarouselPortadaComponent,
    FooterModelComponent,
  ],
  imports: [
    CommonModule,
    HomePortadaRoutingModule,
    NgbModule
  ]
})
export class HomePortadaModule { }
