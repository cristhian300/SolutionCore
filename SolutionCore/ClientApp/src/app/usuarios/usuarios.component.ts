import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from '../services/core.service';
import { ListUsuarioRequest } from '../agent/User/request/ListUsuariosRequest';
import { MatTableDataSource } from '@angular/material';
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


 

  ngOnInit() {

    this.ListUsuarios();
  }


  ListUsuarios(){

    let params = new ListUsuarioRequest()
    params.Credencial = 'cristhian';
    this.coreService.ListUsuario(params).subscribe(
    response =>{
      this.dataSource = new MatTableDataSource<ListUsuarioResult> (response.listUsuarios)
      console.log(response.listUsuarios)
    
    },
    error =>{console.log(error)} ) 
   
  }
}
  

