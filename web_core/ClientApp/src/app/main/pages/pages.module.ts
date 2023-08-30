import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { AdministradorComponent } from './administrador/administrador.component';
import { ModalProductComponent } from './administrador/modal-product/modal-product.component';
import { ModalDeleteProductComponent } from './administrador/modal-delete-product/modal-delete-product.component';
import { ModalUsuariosComponent } from './usuarios/modal-usuarios/modal-usuarios.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlternativeComponent } from './alternative/alternative.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { ClientContactComponent } from './task/client-contact/client-contact.component';
import { IntegracionDocumentosComponent } from './task/integracion-documentos/integracion-documentos.component';
// import { MatDatepickerModule } from '@angular/material;


@NgModule({
  declarations: [
    UsuariosComponent,

    AdministradorComponent,
    ModalProductComponent,
    ModalDeleteProductComponent,
    ModalUsuariosComponent,
    // MoldePageComponent,
    AlternativeComponent,
    HeaderComponent,
    SidebarComponent,
    ClientContactComponent,
    IntegracionDocumentosComponent

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    // MatDatepickerModule, MatNativeDateModule

  ],
  entryComponents: [
    ModalUsuariosComponent
    , ModalProductComponent,
    ModalDeleteProductComponent
  ]
})
export class PagesModule { }
