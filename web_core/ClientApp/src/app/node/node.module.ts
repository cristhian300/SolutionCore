import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeRoutingModule } from './node-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalProductComponent } from './pages/administrador/modal-product/modal-product.component';
import { ModalDeleteProductComponent } from './pages/administrador/modal-delete-product/modal-delete-product.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';

//
@NgModule({
  declarations: [
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    NodeRoutingModule
  ],
  entryComponents:
    [
      ModalProductComponent   , ModalDeleteProductComponent
    ]
})
export class NodeModule { }
