import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { BotonGenericComponent } from './boton-generic/boton-generic.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    UsuariosComponent,
    ModalUsuariosComponent,
    BotonGenericComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
  ],
  entryComponents: [

  ]
})
export class UsuariosModule { }
