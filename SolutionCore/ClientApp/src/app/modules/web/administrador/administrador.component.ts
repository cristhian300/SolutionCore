import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { ListProductEntity, ListProductResponse } from 'src/app/agent/Product/Response/ListProductResponse';
import { CoreService } from 'src/app/services/core.service';
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

  constructor(private coreService: CoreService,
    public dialog: MatDialog,
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }


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
    this.coreService.ListProduct().subscribe(
      response => {

        this.viewModel.listProduct = response.listProduct
        this.ListProductToShow = this.viewModel.listProduct

        this.totalSize = this.viewModel.listProduct.length;
        this.iterator();
        
      }

    )
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

    const modal = this.dialog.open(ModalProductComponent, { width: '90%' })


    modal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ListadoProducto();
    });
  }


  inputChange(value) {

      this.ListProductToShow = this.viewModel.listProduct.filter(f => {
        return f.name.includes(value)
      });
    }
 

    update(product : ListProductEntity){
      console.log(product)

      const modal = this.dialog.open(ModalProductComponent, 
        { width: '90%' ,
          data:product
      })


      // modal.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.ListadoProducto();
      // });

    }

}
