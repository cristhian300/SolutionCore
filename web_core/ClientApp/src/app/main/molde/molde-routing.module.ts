import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MoldePageComponent } from './molde-page/molde-page.component';

const routes: Routes = [
  {
    path: '', children: [

      { path: 'molde', component: MoldePageComponent },
      { path: 'menu', component: MenuComponent }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoldeRoutingModule { }
