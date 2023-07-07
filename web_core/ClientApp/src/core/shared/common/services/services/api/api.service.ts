import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRequestOptions } from './api.interface';

@Injectable()
export class ApiService {
  constructor(public httpClient: HttpClient) {
    // ApiService
  }

  get<T = any>(apiUrl: string, reqOptions: IRequestOptions = {}): Observable<T> {
    const { apiUrl: parseApiUrl, reqOptions: parseReqOptions } = this.parseApiUrlAndReqOptions(apiUrl, reqOptions);

    return (this.httpClient.get<T>(parseApiUrl, parseReqOptions as any) as any).pipe(
      ...this.getDefaultOperators(parseReqOptions),

      //catchError(x => this.onCatchError2(x))

    );
  }

  post<T = any>(apiUrl: string, body: any, reqOptions: IRequestOptions = {}): Observable<T> {
    const { apiUrl: parseApiUrl, reqOptions: parseReqOptions } = this.parseApiUrlAndReqOptions(apiUrl, reqOptions);

    return (this.httpClient.post<T>(parseApiUrl, body, parseReqOptions as any) as any).pipe(
      ...this.getDefaultOperators(parseReqOptions),
    );
  }

  put<T = any>(apiUrl: string, body: any, reqOptions: IRequestOptions = {}): Observable<T> {
    const { apiUrl: parseApiUrl, reqOptions: parseReqOptions } = this.parseApiUrlAndReqOptions(apiUrl, reqOptions);

    return (this.httpClient.put<T>(parseApiUrl, body, parseReqOptions as any) as any).pipe(
      ...this.getDefaultOperators(parseReqOptions),
    );
  }

  delete<T = any>(apiUrl: string, body?: any, reqOptions: IRequestOptions = {}): Observable<T> {
    const { apiUrl: parseApiUrl, reqOptions: parseReqOptions } = this.parseApiUrlAndReqOptions(apiUrl, reqOptions);

    let httpClientDelete = this.httpClient.delete<T>(parseApiUrl, parseReqOptions as any);
    if (body) {
      const httpReq = new HttpRequest('DELETE', parseApiUrl, body, parseReqOptions as any);
      httpClientDelete = this.httpClient.request<T>(httpReq);
    }

    return (httpClientDelete as any).pipe(...this.getDefaultOperators(parseReqOptions));
  }

  postUploadProgress<T = any>(apiUrl: string, body: any, reqOptions: IRequestOptions = {}): Observable<T> {
    const { apiUrl: parseApiUrl, reqOptions: parseReqOptions } = this.parseApiUrlAndReqOptions(apiUrl, reqOptions);
    const req = new HttpRequest('POST', parseApiUrl, body, reqOptions as any);

    return (this.httpClient.request<T>(req) as any).pipe(...this.getDefaultOperators(parseReqOptions));
  }

  onCatchError(showError: boolean, error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof Error) {
      console.warn('Client-Side error occured -> FRONTEND');
    } else {
      console.warn('Server-Side error occured -> BACKEND');
    }
    this.handleError(showError, error);

    return throwError(error);
  }

  handleError(showError: boolean, error: HttpErrorResponse): void {
    // eslint-disable-next-line no-console
    console.info(showError, error);
  }

  postDataAndFile(
    apiUrl: string,
    body: any,
    files: Array<{ name: string; native: File }>,
    reqOptions: { showError?: boolean; params?: { [key: string]: any } },
  ): Observable<any> {
    const { apiUrl: parseApiUrl, reqOptions: parseReqOptions } = this.parseApiUrlAndReqOptions(apiUrl, reqOptions);
    const formData = new FormData();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }

    if (files.length) {
      files.forEach((file) => {
        console.log('files load', file);
        formData.append(file.name, file.native, encodeURIComponent(file.native.name));
      });
    }


    return (this.httpClient.post(parseApiUrl, formData, parseReqOptions as any) as any).pipe(
      ...this.getDefaultOperators(parseReqOptions),
    );
  }

  putDataAndFile(
    apiUrl: string,
    body: any,
    files: Array<{ name: string; native: File }>,
    reqOptions: { showError?: boolean; params?: { [key: string]: any } },
  ): Observable<any> {
    const { apiUrl: parseApiUrl, reqOptions: parseReqOptions } = this.parseApiUrlAndReqOptions(apiUrl, reqOptions);
    const formData = new FormData();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }

    if (files.length) {
      files.forEach((file) => {
        console.log('files load', file);
        formData.append(file.name, file.native, encodeURIComponent(file.native.name));
      });
    }


    return (this.httpClient.put(parseApiUrl, formData, parseReqOptions as any) as any).pipe(
      ...this.getDefaultOperators(parseReqOptions),
    );
  }


  private getDefaultOperators(reqOptions: IRequestOptions): any[] {
    return [catchError(this.onCatchError.bind(this, !!reqOptions.showError))];
  }

  private isParameterInPath(apiUrl: string, paramKey: string): boolean {
    return apiUrl.indexOf(`{${paramKey}}`) !== -1;
  }

  private parseApiUrlAndReqOptions(
    apiUrl: string,
    reqOptions: IRequestOptions,
  ): { apiUrl: string; reqOptions: IRequestOptions } {
    let queryParams = new HttpParams();

    const params = reqOptions.params;
    if (params) {
      Object.keys(params).forEach((paramKey: string) => {
        if (this.isParameterInPath(apiUrl, paramKey)) {
          //revisar paramatros entre {}
          apiUrl = apiUrl.replace(`{${paramKey}}`, params[paramKey]);
        } else {
          if (params[paramKey]) {
            queryParams = queryParams.append(paramKey, params[paramKey]);
          }
        }
      });
    }

    reqOptions = {
      ...reqOptions,
      params: queryParams,
    };

    return {
      apiUrl,
      reqOptions,
    };
  }


  onCatchError2(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof Error) {
      console.warn('Client-Side error occured -> FRONTEND');
    } else {
      console.warn('Server-Side error occured -> BACKEND');
    }
    this.handleError2(error);

    return throwError(error);
  }

  handleError2(error: HttpErrorResponse): void {
    // eslint-disable-next-line no-console
    console.info(false, error);
  }

  getDefaultOperators2(): any[] {

    return []
  }

}
