import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoldeRoutingModule } from './molde-routing.module';
import { MoldePageComponent } from './pages/molde-page/molde-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MenuSideComponent } from './components/menu-side/menu-side.component';
import { PicturePortadaComponent } from './components/picture-portada/picture-portada.component';
import { HomePortadaComponent } from './pages/home-portada/home-portada.component';
import { ListProductHomeComponent } from './components/list-product-home/list-product-home.component';
import { FooterModelComponent } from './components/footer-model/footer-model.component';


@NgModule({
  declarations: [

    MoldePageComponent,
     MenuComponent,
     MenuSideComponent,
     PicturePortadaComponent,
     HomePortadaComponent,
     ListProductHomeComponent,
     FooterModelComponent
  ],
  imports: [
    CommonModule,
    MoldeRoutingModule,
    MaterialModule
  ]
})
export class MoldeModule { }
