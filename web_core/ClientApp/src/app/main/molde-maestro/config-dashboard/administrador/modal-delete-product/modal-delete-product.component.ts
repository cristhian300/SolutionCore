import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListProductEntity } from 'src/app/main/providers/services/Product/product.interface';
import { ProductService } from 'src/app/main/providers/services/Product/product.service';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.css']
})
export class ModalDeleteProductComponent implements OnInit {


  productDetails: ListProductEntity

  constructor(

    @Inject(MAT_DIALOG_DATA) private data: ListProductEntity,
    private productService: ProductService
  ) {
    this.productDetails =  data

   }

  ngOnInit() {

  }

  DeleteProduct(productId:number) {

    this.productService.deleteProduct(productId).subscribe(
    response =>{},
    error=>{}

    )

  }
}
