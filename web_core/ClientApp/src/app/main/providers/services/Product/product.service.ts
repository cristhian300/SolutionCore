import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkManager } from 'src/app/agent/common/network-manager';
import { PostParameter } from 'src/app/agent/common/post-parameter';
import { environment } from 'src/environments/environment.prod';

import { StorageService } from '../common/storage.service';
import { ConfigurationResponse } from '../configuration/configuration';
import { AddProductRequest, EditProductRequest, ListProductResponse } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Url: any;

  constructor( private networkManager: NetworkManager,
    private storageService: StorageService
    ) {

    // this.Url = (this.storageService.retrieve("configuration") as ConfigurationResponse).coreUrl

    this.Url = environment.apiEndpoint+'core/api/'
  }


  /*Product*/
public ListProduct(parameter:any = null){

  const parameters = new PostParameter()
  parameters.PathOperation= this.Url +  'Product/ListProduct'
  parameters.RequestParameter=parameter
  return this.networkManager.post(parameters)  as Observable<ListProductResponse>;

}

public AddProduct(parameter:AddProductRequest = null){

  const parameters = new PostParameter()
  parameters.PathOperation=  this.Url + 'Product/AddProduct'
  parameters.RequestParameter=parameter

  const formData = new FormData();
  for (const key in parameter) {
    if (parameter .hasOwnProperty(key)) {
      formData.append(key, parameter[key]);
    }
  }
  return this.networkManager.postFile(parameters,formData)  as Observable<ListProductResponse>;
}


public EditProduct(parameter:EditProductRequest = null){

  const parameters = new PostParameter()
  parameters.PathOperation= this.Url +  'Product/EditProduct'
  parameters.RequestParameter=parameter

  const formData = new FormData();
  for (const key in parameter) {
    if (parameter .hasOwnProperty(key)) {
      formData.append(key, parameter[key]);
    }
  }

  return this.networkManager.postFile(parameters,formData)  as Observable<ListProductResponse>;
}
}
