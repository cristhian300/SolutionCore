import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StorageService } from '../../providers/services/common/storage.service';
import { ConfigurationResponse } from '../../providers/services/configuration/configuration';
import { ListProductEntity, } from '../../providers/services/Product/product.interface';



import { ProductService } from '../../providers/services/Product/product.service';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ProductDto } from '../../models/DTOs/Product/productosDto';
import { ResponseDTO } from '../../models/DTOs/response-dto';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  /*find permite encontrar algun valor en el array */

  pageEvent: PageEvent;
  listProduct: ProductDto[] = []
  filtro: string = '';
  ListProductToShow: ProductDto[] = [];
  // public pathImage:string ='';
  constructor(private productService: ProductService,
    public dialog: MatDialog,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private storageService: StorageService,
    private ngxLoader: NgxUiLoaderService,
  ) {

    // this.pathImage  = (this.storageService.retrieve("configuration") as ConfigurationResponse).imageUrl
  }


  public pageSize = 10;
  public pageIndex = 0;
  public totalSize = 0;


  ngOnInit() {

    this.ListadoProducto()


  }


  ListadoProducto() {

    this.ngxLoader.start();
    this.productService.ListProduct().subscribe(
      (response: ResponseDTO) => {

        console.log('response lista', response);

        var listProductResponse = response.data as ProductDto[]
        this.listProduct = listProductResponse
        this.totalSize = listProductResponse.length;

        const start = this.pageIndex * this.pageSize;
        const end = (this.pageIndex + 1) * this.pageSize;

        this.ListProductToShow = this.listProduct.slice(start, end);

        this.ngxLoader.stop();
      }, error => {
        this.ngxLoader.stop();
      },
      () => {
        this.ngxLoader.stop();
      }

    )
  }
  public handlePage(e: PageEvent) {
    //indice de paginado
    this.pageIndex = e.pageIndex;
    //cantidad de imagenes a mostrar
    this.pageSize = e.pageSize;
    const end = (this.pageIndex + 1) * this.pageSize;
    const start = this.pageIndex * this.pageSize;
    this.ListProductToShow = this.listProduct.slice(start, end);
  }
  // private setProduct(listProduct: ListProductEntity[]) {
  //   listProduct.forEach(element => {

  //   });


  // }






  CrearProduct() {

    const modal = this.dialog.open(ModalProductComponent, {
      width: '90%',
      height: '95%',
    })


    modal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ListadoProducto();
    });
  }


  inputChange(value) {

    this.ListProductToShow = this.listProduct.filter(f => {
      return f.name.includes(value)
    });
  }


  update(product: ListProductEntity) {
    console.log(product)

    const modal = this.dialog.open(ModalProductComponent,
      {
        width: '90%',
        data: product
      })


    modal.afterClosed().subscribe(result => {

      this.ListadoProducto();
    });

  }

  delete(product: ListProductEntity) {
    const modal = this.dialog.open(ModalDeleteProductComponent,
      {
        width: '50%',
        data: product
      })
    modal.afterClosed().subscribe(result => {

      this.ListadoProducto();
    });

  }
}
