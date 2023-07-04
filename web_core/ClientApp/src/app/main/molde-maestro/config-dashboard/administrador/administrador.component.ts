import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { ListProductEntity, ListProductResponse } from '../../providers/services/Product/product.interface';
// import { ProductService } from '../../providers/services/Product/product.service';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ListProductEntity, ListProductResponse } from 'src/app/main/providers/services/Product/product.interface';
import { ProductService } from '../../services/product/product.service';
import { Product, ProductResponse } from '../../interfaces/product/product';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  /*find permite encontrar algun valor en el array */

  pageEvent: PageEvent;
  // viewModel = new ListProductResponse
  filtro: string = '';
  ListProductToShow: Array<Product>;
  hola: string = 'hola a todos '
  // public pathImage:string ='';
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
        (response: ProductResponse) => {

          this.ListProductToShow = (response.products || [])
            .map((result) =>
            ({
              name: result.name,
              details: result.details,
              price: result.price,
              enable: result.enable,
              uid: result.uid,
              image: this.formatImage(result.image),
            })
            )
          //   response.products

          console.log(this.ListProductToShow);
          this.totalSize = response.products.length;
          // this.iterator();
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
    this.ListProductToShow = this.ListProductToShow.slice(start, end);

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

    this.ListProductToShow = this.ListProductToShow.filter(f => {
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
