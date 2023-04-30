import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoldeRoutingModule } from './molde-routing.module';
import { MoldePageComponent } from './molde-page/molde-page.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [

    MoldePageComponent,
     MenuComponent
  ],
  imports: [
    CommonModule,
    MoldeRoutingModule,
    MaterialModule
  ]
})
export class MoldeModule { }
