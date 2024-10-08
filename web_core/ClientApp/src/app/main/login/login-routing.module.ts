import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'loginNet',
        component: LoginComponent
      },
      { path: '', redirectTo: 'loginNet', pathMatch: 'full' },
    ]




  },
  // { path: 'loginnet', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
