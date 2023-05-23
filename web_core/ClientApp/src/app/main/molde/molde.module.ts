import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoldeRoutingModule } from './molde-routing.module';
import { MoldePageComponent } from './molde-page/molde-page.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MenuSideComponent } from './menu-side/menu-side.component';
import { PicturePortadaComponent } from './picture-portada/picture-portada.component';
import { HomePortadaComponent } from './home-portada/home-portada.component';
import { ListProductHomeComponent } from './list-product-home/list-product-home.component';


@NgModule({
  declarations: [

    MoldePageComponent,
     MenuComponent,
     MenuSideComponent,
     PicturePortadaComponent,
     HomePortadaComponent,
     ListProductHomeComponent
  ],
  imports: [
    CommonModule,
    MoldeRoutingModule,
    MaterialModule
  ]
})
export class MoldeModule { }
