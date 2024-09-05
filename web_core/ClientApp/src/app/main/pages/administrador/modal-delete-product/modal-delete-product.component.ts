import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResponseDTO } from 'src/app/main/models/DTOs/response-dto';
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
    private productService: ProductService,
    private modalDelete: MatDialogRef<ModalDeleteProductComponent>,
    private snackBar: MatSnackBar,
    private ngxLoader: NgxUiLoaderService,
  ) {
    this.productDetails =  data

   }

  ngOnInit() {

  }

  DeleteProduct(productId:number) {


    this.ngxLoader.start();
    this.productService.deleteProduct(productId).subscribe(
    (response  :ResponseDTO ) =>{
        if( response.isSuccess){
        this.snackBar.open('Registro eliminado con exito', 'close', { duration: 5000 });
        this.modalDelete.close();
         console.log('DeleteProduct',response);

         }
         this.ngxLoader.stop();
    },
    ( error: HttpErrorResponse)=>{
         this.ngxLoader.stop();
         this.snackBar.open( error.message, 'close', { duration: 5000, panelClass: ['error-snackbar'] });
    }

    )

  }

  CerrarModal(){
    this.modalDelete.close();
  }
}
