import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { PostParameter } from "./post-parameter";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class NetworkManager {


  /**
   *
   */
  constructor(private HttpClient: HttpClient,
    private snackBar: MatSnackBar

    ) {


  }

  post(parameter: PostParameter): Observable<any> {

    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    const options = { headers: headers };
    const parameters = parameter.RequestParameter
    //create recive el valor del servicio llamado
    return Observable.create(observer => {
      this.HttpClient.post<any>(`${parameter.PathOperation}`,JSON.stringify(parameters)
        , options)
        .subscribe(

          response => {
            try {
              observer.next(response)
            } catch (error) {

              console.log("error post " + error)
              observer.error(error);
            }

          }
        )
    });
  }

  postFile(parameter: PostParameter , data :FormData ): Observable<any> {

    const headers = new HttpHeaders().set( 'Accept', 'application/json');
    const options = { headers: headers };
    const parameters = parameter.RequestParameter
    //create recive el valor del servicio llamado

    var rpt = Observable.create(observer =>{
      this.HttpClient.post<any>(`${parameter.PathOperation}`,data
     ,options)
     .subscribe(
       response =>{

        try {
          observer.next(response)
        } catch (e) {

          this.snackBar.open('catch '+e.message, 'close', { duration: 5000, panelClass: ['error-snackbar'] });
          observer.error(e);
        }},

        httpError => {
          this.snackBar.open('Observable Ha ocurrido un error al tratar de procesar la acción requerida.', 'close', { duration: 5000, panelClass: ['error-snackbar'] });
          observer.error(httpError);
        }

       );
    })


    return  rpt

   /* Observable.create(observer => {
      this.HttpClient.post<any>(`${parameter.PathOperation}`,JSON.stringify(parameters)
        , options)
        .subscribe(

          response => {
            try {
              observer.next(response)
            } catch (error) {

              console.log("error post " + error)
              observer.error(error);
            }

          }
        )
    });*/
  }
  // getTokenPost(postParameters: PostParameter): Observable<BaseResponse> {



  //    const headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
  //    const options = { headers: headers };

  //    const parameters = postParameters.RequestParameter || null;

  //    const publicConfiguration = this.configurationStorageService.getPublicConfiguration();


  //    const body = new URLSearchParams();
  //    body.set('grant_type', 'password');
  //    body.set('client_id', publicConfiguration.clientId);
  //    body.set('client_secret', publicConfiguration.clientSecret);
  //    body.set('scope', publicConfiguration.clientScope);
  //    body.set('username', parameters.userName);
  //    body.set('password', parameters.password);

  //    return Observable.create(observer => {
  //      this.httpClient.post(`${postParameters.PathOperation}`, body.toString(), options).subscribe(
  //        (data: GetTokenResponse) => {
  //          try {
  //            const response: BaseResponse = <BaseResponse>data;

  //            if (data.access_token) {
  //              observer.next(response);
  //            } else {
  //              observer.error('Error inesperado al intentar obtener el token de seguridad.');
  //            }
  //          } catch (e) {
  //            observer.error(e);
  //          }
  //        }, httpError => {
  //          let errorMessage = '';
  //          if (
  //            httpError.status === 400 &&
  //            httpError.error.error_description === AppConstants.IdentityValidation.INVALID_USERNAME_OR_PASSWORD
  //          ) {
  //            errorMessage = AppConstants.Messages.USUARIO_PASSWORD_INCORRECTOS;

  //          } else if (httpError.status === 400 && httpError.error.error === AppConstants.IdentityValidation.INVALID_CLIENT) {
  //            errorMessage = AppConstants.Messages.CONFIGURACION_INCORRECTA_IDENTITY_SERVER;
  //          } else {
  //            errorMessage = AppConstants.Messages.NO_POSIBLE_VERIFICAR_CREDENCIALES_CONTACTE_ADMINISTRADOR_SISTEMAS;
  //          }
  //          this.snackBar.open(errorMessage, 'close', { duration: 5000, panelClass: ['error-snackbar'] });
  //          observer.error(errorMessage);
  //        },
  //        () => {
  //          observer.complete();
  //        });
  //    });
  //  }


}
