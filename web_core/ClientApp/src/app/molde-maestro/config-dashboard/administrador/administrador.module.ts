import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AdministradorComponent } from './administrador.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [

    AdministradorComponent,
    ModalProductComponent,
    ModalDeleteProductComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
  ],
  entryComponents:
    [
      ModalProductComponent, ModalDeleteProductComponent
    ]
})
export class AdministradorModule { }
