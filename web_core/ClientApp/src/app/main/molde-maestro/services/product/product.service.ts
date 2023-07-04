import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/core/shared/common/services/services/api/api.service';

import { ProductResponse } from '../../interfaces/product/product';
import { environment } from 'src/environments/environment';

const base_url = `${environment.apiEndpointNode}/products`

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private apiService: ApiService) { }

  listProduct(): Observable<ProductResponse> {
    return this.apiService.get(base_url)
  }

}
