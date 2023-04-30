import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log('paso por el canActivate del Guard Auth');



    return this.usuarioService.validaToken()
      .pipe(tap(isAutenticate => {
        if (!isAutenticate) {
            this.router.navigateByUrl('/nlogin')
        }
      }));
  }

}
