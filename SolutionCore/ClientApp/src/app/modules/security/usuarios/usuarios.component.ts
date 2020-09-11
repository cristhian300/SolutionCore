import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from '../../../services/core.service';
import { ListUsuarioRequest } from '../../../agent/User/request/ListUsuariosRequest';
import { MatTableDataSource, MatPaginator, MatSort, MatAutocompleteSelectedEvent } from '@angular/material';
import { ListUsuarioResult } from '../../../agent/User/response/ListUsuarioResponse';
import { SecurityViewModel } from '../SecurityViewModels/security-list-viewmodel';
import { UserResultPanelViewModel } from '../SecurityViewModels/user-result-panel-view.model';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ["usuarioId", "nombreCompleto", "credencial", "rol"];

  dataSource: MatTableDataSource<ListUsuarioResult>;

  SecurityViewModel = new SecurityViewModel()

  constructor(private coreService: CoreService) {

  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  filtroEstado: string = "0"
  selectedCar: string


  ngOnInit() {

    this.ListUsuarios();


    // this.dataSource.paginator = this.paginator;

  }

  UsuarioToShow: ListUsuarioResult[];

  ListUsuarios() {

    let params = new ListUsuarioRequest()
    // params.Credencial = 'cristhian';
    this.coreService.ListUsuario(params).subscribe(
      response => {

        this.SecurityViewModel.listUsuarios = response.listUsuarios
        this.UsuarioToShow = this.SecurityViewModel.listUsuarios
        this.dataSource = new MatTableDataSource<ListUsuarioResult>(this.UsuarioToShow)


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.SecurityViewModel.listUsuarios)

        this.ListUsuarioGrupoDetail(this.SecurityViewModel.listUsuarios)

      },
      error => { console.log(error) })

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

    this.dataSource = new MatTableDataSource<ListUsuarioResult>(this.UsuarioToShow)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }





  Panel: UserResultPanelViewModel[] = []
  ListUsuarioGrupoDetail(ListUsuarioGrupo: ListUsuarioResult[]) {

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

}
