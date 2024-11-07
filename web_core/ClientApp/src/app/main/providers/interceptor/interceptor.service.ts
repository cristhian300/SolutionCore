import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BehaviorSubject, throwError } from 'rxjs';
import { mergeMap, catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router,) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this.addAuthentication(req);
    return next.handle(req).pipe(
      catchError((err) => {
        // if (err.status === StatusCodes.BAD_REQUEST) {
        //   alertify.error(err.error);
        // }
        if (err.status === 401) {
         // localStorage.removeItem('TokenUserN');
          // this.router.navigate(['/auth/loginNet']).then(() => {
          //   window.location.reload();
          //   console.warn(err)
          // });
          console.warn(err)
        }
        console.warn(err)
        // if (err.status === StatusCodes.FORBIDDEN) {
        //   alertify.error('Acceso denegado.');
        // }
        return throwError(err);
      })
    );
  }

  addAuthentication(req: HttpRequest<any>): HttpRequest<any> {
    const headers: any = {};
    const authToken = this.GetToken();
    if (authToken) {
      headers['authorization'] = `Bearer ${authToken}`;
      req = req.clone({
        setHeaders: headers,
      });
    }
    return req;
  }

  GetToken() {
    if (!!localStorage.getItem('TokenUserN')) {
      return localStorage.getItem('TokenUserN') as string;
    } else {
      return '';
    }
  }

  // intercept(

  //   req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



  //   // throw new Error('Method not implemented.');

  //   console.log("*Se llamo el servicio ");

  //   req = req.clone({
  //     setHeaders: {
  //         Authorization: `Bearer ${JSON.parse(localStorage.getItem("TokenUserN"))}`
  //     }
  // });
  // return next.handle(req)
  // .pipe(
  //     tap(
  //         (event: HttpEvent<any>) => { if (event instanceof HttpResponse) { } },
  //         (err: any) => {
  //             if (err instanceof HttpErrorResponse && err.status === 401) {
  //                 // this.loginService.logOut();
  //                 localStorage.removeItem("TokenUserN");
  //                 this.router.navigate(["/loginnet"]);
  //                 console.warn(err)
  //             }
  //         }
  //     )
  // );}




}
function observableThrowError(err: any): any {
  throw new Error('Function not implemented.');
}

