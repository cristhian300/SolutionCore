import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,   Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



import { AddUsuarioRequest } from '../../../../agent/User/request/AddUsuariosRequest';
import { ListRolesRequest } from '../../../../agent/User/request/ListRolesRequest';
import { UpdateUsuarioRequest } from '../../../../agent/User/request/UpdateUsuarioRequest';
import { ListRoleResult } from '../../../../agent/User/response/ListRolesResponse';
import { ListUsuarioEntity } from '../../../../agent/User/response/ListUsuarioResponse';
import { CoreService } from '../../../../services/core.service';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.css']
})
export class ModalUsuariosComponent implements OnInit {
  formGroupD: FormGroup;

  constructor(private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: ListUsuarioEntity
    , private modalUsuario: MatDialogRef<ModalUsuariosComponent>,
    private coreService: CoreService, private formbuilder: FormBuilder) {

    this.formGroupD = this.CreateForm();
  }




  ngOnInit() {


    console.log(`data popup  ${JSON.stringify(this.data)}`);


    this.ListRoles()

  }



  ngAfterViewInit() {

    console.log('ngAfterViewInit');
    setTimeout(() => {
      this.CargaDatosModal(this.data)
    }, 0)
  }

  CreateForm(): FormGroup {
    return this.formbuilder.group({
      codUsuario: [""],
      name: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      credencial: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      password: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      rol: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      isDeleted: [false]
    })

  }





  // onSubmit() {


  //   if (!this.formGroupD.valid) {
  //     this.snackBar.open('DEBE_INGRESAR_DATOS_OBLIGATORIOS', 'close', { duration: 3000, panelClass: ['error-snackbar'] });
  //     return;
  //   } else {


  //     if (!this.formGroupD.get('codUsuario').value) {
  //       this.AddUsuario(this.formGroupD);


  //     } else {

  //       this.UpdateUsuario(this.formGroupD)


  //     }



  //   }

  // };

  transaccion() {


    if (this.formGroupD.invalid) {
      this.snackBar.open('DEBE_INGRESAR_DATOS_OBLIGATORIOS', 'close', { duration: 3000, panelClass: ['error-snackbar'] });
    } else {


      if (!this.formGroupD.get('codUsuario').value && this.formGroupD.valid) {



        this.AddUsuario(this.formGroupD);


      } else {

        this.UpdateUsuario(this.formGroupD)

      }
    }



  }

  AddUsuario(formGroupD: FormGroup ) {




    let params = new AddUsuarioRequest()
    params.nombreCompleto = this.formGroupD.get("name").value
    params.credencial = this.formGroupD.get("credencial").value
    params.clave = this.formGroupD.get("password").value
    params.roleId = parseInt(this.formGroupD.get("rol").value)
    params.deleted = this.formGroupD.get("isDeleted").value


    this.coreService.AddUsuario(params).subscribe(
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


  UpdateUsuario(formGroupD: FormGroup) {

    let params = new UpdateUsuarioRequest()
    params.usuarioId = this.formGroupD.get('codUsuario').value
    params.nombreCompleto = this.formGroupD.get("name").value
    params.credencial = this.formGroupD.get("credencial").value
    params.clave = this.formGroupD.get("password").value
    params.roleId = parseInt(this.formGroupD.get("rol").value)
    params.deleted = this.formGroupD.get("isDeleted").value


    this.coreService.UpdateUsuario(params).subscribe(
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

    // this.formGroupD.reset()

    this.formGroupD.controls.name.setValue('');
    this.formGroupD.controls.credencial.setValue('');
    this.formGroupD.controls.password.setValue('');
    this.formGroupD.controls.rol.setValue('');
    this.formGroupD.controls.isDeleted.setValue(false);

    this.snackBar.open('DEBE_INGRESAR_DATOS_OBLIGATORIOS', 'close', { duration: 3000, panelClass: ['error-snackbar'] });



  }


  RolesList: ListRoleResult[]
  ListRoles() {

    let paramas = new ListRolesRequest()

    this.coreService.ListRoles(paramas).subscribe(response => {
      this.RolesList = response.listRoles


    })
  }

  CloseModal() {
    this.modalUsuario.close()

  }


  CargaDatosModal(modal: ListUsuarioEntity) {

    console.log(`model ${modal}`);
    // this.formGroupD.reset()
    if (modal != null) {
      this.formGroupD.get('name').setValue(modal.nombreCompleto);
      this.formGroupD.get('credencial').setValue(modal.credencial);
      this.formGroupD.get('rol').setValue(modal.roleId.toString());
      this.formGroupD.get('password').setValue(modal.clave);
      this.formGroupD.get('codUsuario').setValue(modal.usuarioId);
    }

  }

}
