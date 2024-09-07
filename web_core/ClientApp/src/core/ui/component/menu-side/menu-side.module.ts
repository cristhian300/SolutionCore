import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSideComponent } from './menu-side.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';



@NgModule({
  declarations: [MenuSideComponent],
  imports: [
    CommonModule,MaterialModule ,RouterModule,
  ],
  exports:[MenuSideComponent]
})
export class MenuSideModule { }
