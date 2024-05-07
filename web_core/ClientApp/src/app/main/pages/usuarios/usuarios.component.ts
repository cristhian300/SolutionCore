import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';


import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ModalUsuariosComponent } from './modal-usuarios/modal-usuarios.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { SecurityViewModel } from 'src/app/modules/security/SecurityViewModels/security-list-viewmodel';
import { UserResultPanelViewModel } from 'src/app/modules/security/SecurityViewModels/user-result-panel-view.model';
import { CoreService } from '../../providers/services/core.service';
import { UsuariosService } from '../../providers/services/Usuarios/usuarios.service';
import { AddUsuarioRequest, ListRoleResult, ListRolesRequest, ListUsuarioRequest, ListUsuarioResponse, ListUsuarioResult } from '../../providers/services/Usuarios/usuarios.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  formGroup: FormGroup

  displayedColumns: string[] = ["usuarioId", "nombreCompleto", "rol", 'actions'];
  dataSource: MatTableDataSource<ListUsuarioResult>;

  SecurityViewModel = new SecurityViewModel()
  selectedFile: File = null;
  files: Array<{ name: string, native: File }> = [];
  retornoHijo:string;

  constructor(private ngxLoader: NgxUiLoaderService,
    public dialog: MatDialog,
    private coreService: UsuariosService,
    private formbuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // this.formGroup = this.CreateForm();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filtroEstado: string = "0"
  selectedCar: string


  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = "Opciones por página";
    this.ListUsuarios();
    // this.ListRoles()
    // this.dataSource.paginator = this.paginator;
  }

  UsuarioToShow: ListUsuarioResult[];

  ListUsuarios() {

    let request: ListUsuarioRequest={
      Credencial:'0'
    }

    this.coreService.ListUsuario(request).subscribe(
     (response:ListUsuarioResponse ) => {
        // this.SecurityViewModel.listUsuarios = response.listUsuarios
        // this.UsuarioToShow = this.SecurityViewModel.listUsuarios

        console.log('this.UsuarioToShow',response.listUsuarios);

        this.dataSource = new MatTableDataSource<ListUsuarioResult>(response.listUsuarios)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.ListUsuarioGrupoDetail(this.SecurityViewModel.listUsuarios)

      },
      error => { console.log(error) })

  }


  RolesList: ListRoleResult[]
  ListRoles() {

    this.ngxLoader.start();
    let paramas = new ListRolesRequest()
    this.coreService.ListRoles(paramas).subscribe(response => {
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
    // console.log(this.SecurityViewModel.listUsuarios)

    // this.UsuarioToShow = this.SecurityViewModel.listUsuarios.filter(f => f.deleted == event.value)

    // this.dataSource = new MatTableDataSource<ListUsuarioResult>(this.UsuarioToShow)
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }





  Panel: UserResultPanelViewModel[] = []
  // ListUsuarioGrupoDetail(ListUsuarioGrupo: ListUsuarioResult[]) {

  //   let columns: string[] = ['Codigo', 'Nombre', 'Credencial', 'Rol']
  //   let cabecera: string[] = []
  //   let row = []
  //   let rows = []
  //   let rolId = 0
  //   let title

  //   ListUsuarioGrupo.forEach(r => {

  //     if (r.roleId != rolId) {
  //       if (rolId != 0) {
  //         rows.push(row)
  //         this.Panel.push(new UserResultPanelViewModel(title, columns, rows))
  //       }
  //       // title = r.rol
  //       row = []
  //       rows = []
  //       rolId = r.roleId
  //     }
  //     row.push(r.usuarioId.toString(), r.nombreCompleto, )
  //     rows.push(row)
  //     row = []
  //   });
  //   rows.push(row)
  //   this.Panel.push(new UserResultPanelViewModel(title, columns, rows))
  //   console.log(this.Panel)
  //   return this.Panel

  // }

  CreateForm(): FormGroup {
    return this.formbuilder.group({
      nombre: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      credencial: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      clave: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      rol: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      isDeleted: [false]

    })

  }


  searchKey: string;



  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  onCreate(testInput:string) {

    console.log(testInput,'detalle input' );

    // const dialogRef = this.dialog.open(ModalUsuariosComponent, {
    //   width: '60%',

    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.ListUsuarios();


    // });

  }


  onClear() { }



  onSubmit() {

    let params = new AddUsuarioRequest()
    params.nombreCompleto = this.formGroup.get("nombre").value
    params.credencial = this.formGroup.get("credencial").value
    params.clave = this.formGroup.get("clave").value
    params.roleId = parseInt(this.formGroup.get("rol").value)
    params.deleted = this.formGroup.get("isDeleted").value

    this.coreService.AddUsuario(params).subscribe(
      response => { },
      error => {

        console.log(error)
      }


    )


    console.log(this.formGroup.value);
    // console.log(`parametros ${ JSON.stringify( params)}`);
  }


  onEdit(elemento: ListUsuarioResult) {

    console.log( 'update' , elemento);

    // const dialogRef = this.dialog.open(ModalUsuariosComponent, {
    //   width: '60%',
    //   // disableClose: true
    //   data: elemento
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.ListUsuarios();
    // });
  }


  loadFile(event: Event) {

    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];

    const extension = this.selectedFile.name.split('.')[1];
    const uploadFileName = this.selectedFile.name;
    //validación del archivo
    this.validateFile(target, extension);

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.files.push({ name: 'Document', native: this.selectedFile });
    }
  }


  validateFile(target: HTMLInputElement, extension: string) {
    if (extension == null || extension.toLowerCase() !== 'xlsx') {
      target.value = null;
      this.snackBar.open("Debe cargar un archivo en formato excel", 'close', { duration: 3000 });
      return;
    }

    // if (maxSize < this.selectedFile.size) {
    //   event.srcElement.value = null;
    //   this.notificationService.error(
    //     appConstants.titleModal.errorFile,
    //     appConstants.messageModal.errorMessageFileSize,
    //   );
    //   return;
  }

  DevuelveValor(event:any){
    this.retornoHijo = event
  }

}


