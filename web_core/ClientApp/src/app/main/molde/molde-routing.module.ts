import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MoldePageComponent } from './molde-page/molde-page.component';
import { AuthGuard } from 'src/app/node/guards/auth.guard';

const routes: Routes = [
  {
    // path: '',
    // children: [

    //   { path: 'molde', component: MoldePageComponent },
    //   { path: 'menu', component: MenuComponent }

    // ]

    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'molde', component: MoldePageComponent, data: { titulo: 'molde' } }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoldeRoutingModule { }
