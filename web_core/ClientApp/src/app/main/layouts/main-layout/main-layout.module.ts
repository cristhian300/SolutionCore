import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MaterialModule,

    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,



  ]
})
export class MainLayoutModule { }
