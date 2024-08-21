import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ListProductEntity,   } from 'src/app/main/providers/services/Product/product.interface';
import { ProductService } from '../../services/product/product.service';
import { IProduct, IProductResponse } from '../../interfaces/product/product';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  pageEvent: PageEvent;
  filtro: string = '';
  ListProductToShow: Array<IProduct>;
  ListProduct: Array<IProduct>;

  constructor(

    private productService: ProductService,
    public dialog: MatDialog,
    private ngxLoader: NgxUiLoaderService,
  ) { }




  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;


  ngOnInit() {

    this.ListadoProducto()


  }


  ListadoProducto() {

    this.ngxLoader.start();
    this.productService.listProduct()
      .subscribe(
        (response: IProductResponse) => {
          this.ListProductToShow = (response.products || [])
            .map((result) =>
            ({
              name: result.name,
              details: result.details,
              price: result.price,
              enable: result.enable,
              uid: result.uid,
              image: result.image,
              pathImage: this.formatImage(result.image),
            })
            )

          this.ListProduct = this.ListProductToShow
          this.totalSize = response.products.length;

          this.ngxLoader.stop();
        }, error => {
          this.ngxLoader.stop();
        },
        () => {
          this.ngxLoader.stop();
        }

      )
  }


  formatImage(image: string) {
    let path
    if (!image) {
      path = 'assets/web/products/carrito_gris.jpg'
    }
    else {
      console.log(`${environment.apiEndpointNode}/upload/products/${image}`);

      path = `${environment.apiEndpointNode}/upload/products/${image}`
    }
    return path
  }

  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.ListProduct = this.ListProductToShow.slice(start, end);
    this.totalSize = this.ListProduct.length
  }


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
    console.log('value', value);

    this.ListProduct = this.ListProductToShow.filter(f => {
      return f.name.includes(value)
    });
    this.totalSize = this.ListProduct.length
  }


  update(product: IProduct) {
    console.log(product)

    const modal = this.dialog.open(ModalProductComponent,
      {
        width: '90%',
        data: product
      })


    modal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ListadoProducto();
    });

  }

  delete(product: ListProductEntity) {
    const modal = this.dialog.open(ModalDeleteProductComponent,
      {
        width: '90%',
        data: product
      })
  }

}
