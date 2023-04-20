import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoldeRoutingModule } from './molde-routing.module';
import { MoldePageComponent } from './molde-page/molde-page.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [

    MoldePageComponent,
     MenuComponent
  ],
  imports: [
    CommonModule,
    MoldeRoutingModule
  ]
})
export class MoldeModule { }
