import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from '../services/core.service';
import { ListUsuarioRequest } from '../agent/User/request/ListUsuariosRequest';
import { MatTableDataSource, MatPaginator, MatSort, MatAutocompleteSelectedEvent } from '@angular/material';
import { ListUsuarioResult } from '../agent/User/response/ListUsuarioResponse';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ["usuarioId","nombreCompleto","credencial","rol" ];
  
  dataSource:MatTableDataSource<ListUsuarioResult>;
  
  // dataSource = ELEMENT_DATA;

  constructor( private coreService :CoreService   ) {

   }
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   filtroEstado :string = "0"
   selectedCar :string 


  ngOnInit() {

    this.ListUsuarios();
    
   
    // this.dataSource.paginator = this.paginator;
   
  }


  ListUsuarios(){

    let params = new ListUsuarioRequest()
    params.Credencial = 'cristhian';
    this.coreService.ListUsuario(params).subscribe(
    response =>{
      this.dataSource = new MatTableDataSource<ListUsuarioResult> (response.listUsuarios)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(response.listUsuarios)
    
    },
    error =>{console.log(error)} ) 
   
  }

  OnChangeEstados(event){

    let target = event.source.selected._element.nativeElement;
    console.log (event)
    console.log (target)
    let selectedData = {
      value: event.value,
      text: target.innerText.trim()
    };
    console.log(selectedData);
  }

}
  

