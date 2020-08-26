import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { PostParameter } from "./post-parameter";
import { Injectable } from "@angular/core";

@Injectable()
export class NetworkManager {


    /**
     *
     */
    constructor( private HttpClient:HttpClient) {
        

    }

    post(parameter: PostParameter): Observable<any> {

        const headers = new HttpHeaders({ 'content-type': 'application/json' });
        const options = { headers: headers };
        const parameters = parameter.RequestParameter
        return this.HttpClient.post<any>( `${parameter.PathOperation}` , JSON.stringify(parameters)    , options);
       
      }

}