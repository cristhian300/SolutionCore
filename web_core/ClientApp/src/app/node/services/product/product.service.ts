import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/core/shared/common/services/services/api/api.service';

import { IProductRequest, IProductResponse, IUpdateProductRequest } from '../../../molde-maestro/interfaces/product/product';
import { environment } from 'src/environments/environment';

const base_url = `${environment.apiEndpointNode}/api/products`

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private apiService: ApiService) { }

  listProduct(): Observable<IProductResponse> {
    return this.apiService.get(base_url)
  }

  insertProduct(request: IProductRequest, files: Array<{ name: string; native: File }>): Observable<IProductResponse> {
    return this.apiService.postDataAndFile(base_url, request, files, {})
  }


  updateProduct(request: IUpdateProductRequest, files: Array<{ name: string; native: File }>): Observable<IProductResponse> {
    const { uid, ...body } = request
    return this.apiService.putDataAndFile(`${base_url}/${uid}`, body, files, {})
  }
}
