import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from '../../../services/core.service';
import { ListUsuarioRequest } from '../../../agent/User/request/ListUsuariosRequest';
//import { MatTableDataSource, MatPaginator, MatSort, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { ListUsuarioEntity } from '../../../agent/User/response/ListUsuarioResponse';
import { SecurityViewModel } from '../SecurityViewModels/security-list-viewmodel';
import { UserResultPanelViewModel } from '../SecurityViewModels/user-result-panel-view.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ListRolesRequest } from '../../../agent/User/request/ListRolesRequest';
import { ListRoleResult } from '../../../agent/User/response/ListRolesResponse';
import { AddUsuarioRequest } from '../../../agent/User/request/AddUsuariosRequest';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

formGroup:FormGroup

  displayedColumns: string[] = ["usuarioId", "nombreCompleto", "credencial", "rol", 'actions'];

  dataSource: MatTableDataSource<ListUsuarioEntity>;

  SecurityViewModel = new SecurityViewModel()

  constructor( private ngxLoader: NgxUiLoaderService ,public dialog: MatDialog,private coreService: CoreService, private formbuilder:FormBuilder) {
    this.formGroup = this.CreateForm();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filtroEstado: string = "0"
  selectedCar: string


  ngOnInit() {

    this.ListUsuarios();
    this.ListRoles()

    // this.dataSource.paginator = this.paginator;
  
  }

  UsuarioToShow: ListUsuarioEntity[];

  ListUsuarios() {
 
    let params = new ListUsuarioRequest()
    // params.Credencial = 'cristhian';
    this.coreService.ListUsuario(params).subscribe(
      response => {

        this.SecurityViewModel.listUsuarios = response.listUsuarios
        this.UsuarioToShow = this.SecurityViewModel.listUsuarios
        this.dataSource = new MatTableDataSource<ListUsuarioEntity>(this.UsuarioToShow)


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.SecurityViewModel.listUsuarios)

        this.ListUsuarioGrupoDetail(this.SecurityViewModel.listUsuarios)

      },
      error => { console.log(error) })

  }


RolesList:ListRoleResult[]
ListRoles(){

  this.ngxLoader.start();
  let paramas = new ListRolesRequest()
  this.coreService.ListRoles(paramas ).subscribe( response =>{
   this.RolesList = response.listRoles
      this.ngxLoader.stop();

  })
}

  OnChangeEstados(event) {
    // let target = event.source.selected._element.nativeElement;
    // console.log (event)
    // console.log (target)
    // let selectedData = {
    //   value: event.value,
    //   text: target.innerText.trim()
    // };
    // console.log(selectedData);
    console.log(this.SecurityViewModel.listUsuarios)

    this.UsuarioToShow = this.SecurityViewModel.listUsuarios.filter(f => f.deleted == event.value)

    this.dataSource = new MatTableDataSource<ListUsuarioEntity>(this.UsuarioToShow)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }





  Panel: UserResultPanelViewModel[] = []
  ListUsuarioGrupoDetail(ListUsuarioGrupo: ListUsuarioEntity[]) {

    let columns: string[] = ['Codigo', 'Nombre', 'Credencial', 'Rol']
    let cabecera: string[] = []
    let row = []
    let rows = []
    let rolId = 0
    let title

    ListUsuarioGrupo.forEach(r => {

      if (r.roleId != rolId) {
        if (rolId != 0) {
          rows.push(row)
          this.Panel.push(new UserResultPanelViewModel(title, columns, rows))
        }
        title = r.rol
        row = []
        rows = []
        rolId = r.roleId
      }
      row.push(r.usuarioId.toString(), r.nombreCompleto, r.credencial, r.rol)
      rows.push(row)
      row = []
    });
    rows.push(row)
    this.Panel.push(new UserResultPanelViewModel(title, columns, rows))
    console.log(this.Panel)
    return this.Panel

  }

CreateForm() : FormGroup {
  return this.formbuilder.group({
    nombre: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
    credencial: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
    clave: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
    rol: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
    isDeleted:[false]
  
  })

}


searchKey: string;  

onSearchClear() {
  this.searchKey = "";
  this.applyFilter();
}

applyFilter() {
  this.dataSource.filter = this.searchKey.trim().toLowerCase();
}

onCreate(){

  const dialogRef = this.dialog.open(ModalUsuariosComponent, {
    width: '60%',
    // disableClose: true
    // data: {name: this.name, animal: this.animal}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.ListUsuarios();


  });

}


onClear(){}



// onSubmit(){

//   let params = new AddUsuarioRequest()
//   params.nombreCompleto = this.formGroup.get("nombre").value
//   params.credencial = this.formGroup.get("credencial").value
//   params.clave= this.formGroup.get("clave").value
//   params.roleId=  parseInt( this.formGroup.get("rol").value)
//   params.deleted = this.formGroup.get("isDeleted").value

// this.coreService.AddUsuario(params).subscribe(
// response =>{},
// error =>{

//   console.log(error)
// }


// )


// console.log(this.formGroup.value);
// // console.log(`parametros ${ JSON.stringify( params)}`);
// }


onEdit(elemento:ListUsuarioEntity){

  console.log(`update ${ JSON.stringify(elemento) }`);

 

  const dialogRef = this.dialog.open(ModalUsuariosComponent, {
    width: '60%',
    // disableClose: true
    data: elemento
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.ListUsuarios();


  });
}

}
