import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { StorageService } from '../../providers/services/common/storage.service';
import { ConfigurationResponse } from '../../providers/services/configuration/configuration';
import { ListProductEntity, ListProductResponse } from '../../providers/services/Product/product.interface';



import { ProductService } from '../../providers/services/Product/product.service';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';
import { ModalProductComponent } from './modal-product/modal-product.component';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  /*find permite encontrar algun valor en el array */

  pageEvent: PageEvent;
  viewModel = new ListProductResponse
  filtro: string = '';
  ListProductToShow: ListProductEntity[] = [];
  public pathImage:string ='';
  constructor(private productService: ProductService,
    public dialog: MatDialog,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private storageService: StorageService

    ) {

        this.pathImage  = (this.storageService.retrieve("configuration") as ConfigurationResponse).imageUrl
    }


    public pageSize = 10;
    public currentPage = 0;
    public totalSize = 0;


  ngOnInit() {

    this.ListadoProducto()


  }


  ListadoProducto() {

    //   var parameters = {
    //     MainUrl:"bb"
    //  };
    // parameters
    this.productService.ListProduct().subscribe(
      response => {

        this.viewModel.listProduct = response.listProduct
        debugger
        this.ListProductToShow = this.viewModel.listProduct

        this.totalSize = this.viewModel.listProduct.length;
        this.iterator();

      }

    )
  }

  private setProduct( listProduct:ListProductEntity[]){
    listProduct.forEach(element => {

       });


  }

  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.ListProductToShow  = this.viewModel.listProduct.slice(start, end);
    // this.dataSource = part;
  }


  CrearProduct() {

    const modal = this.dialog.open(ModalProductComponent, {
      width: '90%',

    })


    modal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ListadoProducto();
    });
  }


  inputChange(value) {

      this.ListProductToShow = this.viewModel.listProduct.filter(f =>  {
        return f.name.includes(value)
      });
    }


    update(product : ListProductEntity){
      console.log(product)

      const modal = this.dialog.open(ModalProductComponent,
        { width: '90%' ,
          data:product
      })


      modal.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ListadoProducto();
      });

    }

    delete(product : ListProductEntity){
      const modal = this.dialog.open(ModalDeleteProductComponent,
        { width: '90%' ,
          data:product
      })


    }
}
