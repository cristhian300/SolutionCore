import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListUsuarioResult } from 'src/app/main/providers/services/Usuarios/usuarios.interfaces';


@Component({
  selector: 'app-boton-generic',
  templateUrl: './boton-generic.component.html',
  styleUrls: ['./boton-generic.component.css']
})
export class BotonGenericComponent implements OnInit {

  dataSource: MatTableDataSource<ListUsuarioResult>;
  searchKey: string;
  @Input() messageInput:string;
  @Output() regresoVariable = new EventEmitter<string>();

  incremento = 0

  constructor() { }

  ngOnInit(): void {
    setInterval(()=> this.numIncrement(this.incremento) , 1000  );

    this.regresoVariable.emit("viene del hijo")
  }

  numIncrement(increment:number){
    this.incremento++
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


  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
