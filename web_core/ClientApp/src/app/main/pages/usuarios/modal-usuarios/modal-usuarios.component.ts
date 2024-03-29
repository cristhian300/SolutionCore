import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/main/providers/services/core.service';
import { AddUsuarioRequest, ListRoleResult, ListRolesRequest, ListUsuarioResult, UpdateUsuarioRequest } from 'src/app/main/providers/services/Usuarios/usuarios.interfaces';
import { UsuariosService } from 'src/app/main/providers/services/Usuarios/usuarios.service';




@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.css']
})
export class ModalUsuariosComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: ListUsuarioResult
    , private modalUsuario: MatDialogRef<ModalUsuariosComponent>,
    private usuariosService:  UsuariosService, private formbuilder: FormBuilder) {

    this.formGroup = this.CreateForm();
  }

  ngOnInit() {


    console.log(`data popup  ${JSON.stringify(this.data)}`);


    this.ListRoles()

  }



  ngAfterViewInit() {

    setTimeout(() => {
      this.CargaDatosModal(this.data)
    }, 0)

  }

  CreateForm(): FormGroup {
    return this.formbuilder.group({

      codUsuario: [""],
      nombre: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      // credencial: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      clave: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      rol: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      isDeleted: [false]
    })
  }

  onSubmit() {


    if (!this.formGroup.valid) {
      this.snackBar.open('DEBE INGRESAR DATOS OBLIGATORIOS', 'close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    } else {
      if (!this.formGroup.get('codUsuario').value) {
        this.AddUsuario(this.formGroup);
      } else {
        this.UpdateUsuario(this.formGroup)
      }
    }

  };



  AddUsuario(formGroup: FormGroup) {

    let params = new AddUsuarioRequest()
    params.nombreCompleto = this.formGroup.get("nombre").value
    params.clave = this.formGroup.get("clave").value
    params.roleId = parseInt(this.formGroup.get("rol").value)
    params.deleted = this.formGroup.get("isDeleted").value

    this.usuariosService.AddUsuario(params).subscribe(
      response => {
        this.snackBar.open("Usuario Creado Exitosamente", 'close', { duration: 3000 })
        this.modalUsuario.close()
      },
      error => {
        this.snackBar.open(error.message, 'close', { duration: 5000, panelClass: ['error-snackbar'] });
        console.log(error)
      }
    )
  }


  UpdateUsuario(formGroup: FormGroup) {

    let params = new UpdateUsuarioRequest()
    params.usuarioId = this.formGroup.get('codUsuario').value
    params.nombreCompleto = this.formGroup.get("nombre").value
    // params.credencial = this.formGroup.get("credencial").value
    params.clave = this.formGroup.get("clave").value
    params.roleId = parseInt(this.formGroup.get("rol").value)
    params.deleted = this.formGroup.get("isDeleted").value


    this.usuariosService.UpdateUsuario(params).subscribe(
      response => {

        this.snackBar.open("Usuario actualizado Exitosamente", 'close', { duration: 3000 })
        this.modalUsuario.close()
      },
      error => {
        this.snackBar.open(error.message, 'close', { duration: 5000, panelClass: ['error-snackbar'] });
        console.log(error)
      }

    )

  }



  onClear() {

    this.formGroup.reset()

  }


  RolesList: ListRoleResult[]
  ListRoles() {

    let paramas = new ListRolesRequest()

    this.usuariosService.ListRoles(paramas).subscribe(response => {
      this.RolesList = response.listRoles


    })
  }

  CloseModal() {
    this.modalUsuario.close()

  }


  CargaDatosModal(modal: ListUsuarioResult) {

    console.log(`model ${modal}`);

    if (modal != null) {
      this.formGroup.get('nombre').setValue(modal.nombreCompleto);
      // this.formGroup.get('credencial').setValue(modal.credencial);
      this.formGroup.get('rol').setValue(modal.roleId.toString());
      this.formGroup.get('clave').setValue(modal.clave);
      this.formGroup.get('codUsuario').setValue(modal.usuarioId);
    }

  }

}
