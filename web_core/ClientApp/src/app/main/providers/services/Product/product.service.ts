import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkManager } from 'src/app/main/providers/legacy-agent/network-manager';
import { PostParameter } from 'src/app/main/providers/legacy-agent/post-parameter';


import { StorageService } from '../common/storage.service';
import { ConfigurationResponse } from '../configuration/configuration';
import { AddProductRequest, EditProductRequest } from './product.interface';
import { ApiService } from 'src/core/shared/common/services/services/api/api.service';
import { ResponseDTO } from 'src/app/main/models/DTOs/response-dto';
import { ListProductResponse } from 'src/app/main/models/DTOs/Product/productosDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Url: any;

  constructor(private networkManager: NetworkManager,
    private storageService: StorageService,
    private apiService: ApiService
  ) {

    // this.Url = (this.storageService.retrieve("configuration") as ConfigurationResponse).coreUrl

    this.Url = environment.apiEndpoint + '/core/api/'
  }


  /*Product*/
  public ListProduct(parameter: any = null) {

    const parameters = new PostParameter()
    parameters.PathOperation = this.Url + 'Product/ListProduct'
    parameters.RequestParameter = parameter
    return this.networkManager.post(parameters) as Observable<ResponseDTO>;

  }

  public AddProduct(parameter: AddProductRequest = null) {
    // let files = []
    // files.push({ name: 'Document', native: parameter.files });
    const formData = new FormData();
    for (const key in parameter) {
      if (parameter.hasOwnProperty(key)) {
        formData.append(key, parameter[key]);
      }
    }
    return this.apiService.post(this.Url + 'Product/AddProduct', formData);
  }


  public EditProduct(parameter: EditProductRequest = null) {

    const parameters = new PostParameter()
    parameters.PathOperation = this.Url + 'Product/EditProduct'
    parameters.RequestParameter = parameter

    const formData = new FormData();
    for (const key in parameter) {
      if (parameter.hasOwnProperty(key)) {
        formData.append(key, parameter[key]);
      }
    }
    return this.networkManager.postFile(parameters, formData) as Observable<ListProductResponse>;
  }


  public deleteProduct(productId: number) {
    // const parameters = new PostParameter()
    // parameters.PathOperation = this.Url + 'Product/DeleteProduct'
    //parameters.RequestParameter = parameter
    // const body = {productId}
    // return this.apiService.delete(`${parameters.PathOperation}/{productId}`, body, { params: { productId } })
    return this.apiService.delete(`${this.Url + 'Product/DeleteProduct'}/${productId}`) as Observable<ResponseDTO>

  }
}
