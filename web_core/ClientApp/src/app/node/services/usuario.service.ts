import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form';
import { LoginForm } from '../interfaces/login-form';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const baseUrl = environment.apiEndpointNode
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {




  constructor(private http: HttpClient,
    private router: Router
  ) {

  }


  logOut() {

    localStorage.removeItem('token')

    google.accounts.id.revoke('cristhian8730@gmail.com', () => {

      this.router.navigateByUrl('/nlogin')
    })
  }


  validaToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${baseUrl}/login/renew`, {

      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(err => of(false))
    )

  }




  crearUsuario(formData: RegisterForm) {
    console.log('Registrar Usuario');
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }


  login(formData: LoginForm) {

    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }

      )
    )
  }

  loginGoogle(token: string) {

    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }

      )
    )
  }




}
