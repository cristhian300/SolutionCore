import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePortadaRoutingModule } from './home-portada-routing';
import { HomePortadaComponent } from './home-portada.component';

import { ListProductHomeComponent } from '../../../../core/ui/component/list-product-home/list-product-home.component';
import { CarouselPortadaComponent } from '../../../../core/ui/component/carousel-portada/carousel-portada.component';
import { FooterModelComponent } from '../../../../core/ui/component/footer-model/footer-model.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuSideModule } from 'src/core/ui/component/menu-side/menu-side.module';
// import { MenuSideModule } from 'src/core/ui/component/menu-side/menu-side.module';


@NgModule({
  declarations: [
    HomePortadaComponent,


    //componentes compartidos
    ListProductHomeComponent,
    CarouselPortadaComponent,
    FooterModelComponent,
  ],
  imports: [
    CommonModule,
    HomePortadaRoutingModule,
    NgbModule,
    MenuSideModule
    // MenuSideModule
  ]
})
export class HomePortadaModule { }
