import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';
import { AdministradorComponent } from './administrador.component';
import { MenuSideModule } from 'src/core/ui/component/menu-side/menu-side.module';




@NgModule({
  declarations: [AdministradorComponent,
    ModalProductComponent,
    ModalDeleteProductComponent,

  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MenuSideModule

  ],
  entryComponents: [

    , ModalProductComponent,
    ModalDeleteProductComponent
  ]
})
export class AdministratorModule { }
