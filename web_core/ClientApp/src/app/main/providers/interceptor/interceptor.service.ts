import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router,) { }
  intercept(

    req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    // throw new Error('Method not implemented.');

    console.log("*Se llamo el servicio ");

    req = req.clone({
      setHeaders: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("User"))}`
      }
  });
  return next.handle(req)
  .pipe(
      tap(
          (event: HttpEvent<any>) => { if (event instanceof HttpResponse) { } },
          (err: any) => {
              if (err instanceof HttpErrorResponse && err.status === 401) {
                  // this.loginService.logOut();
                  localStorage.removeItem("User");
                  this.router.navigate(["/log"]);
                  console.warn(err)
              }
          }
      )
  );


  }
}
