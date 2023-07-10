import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerForm = this.fb.group({
    nombre: ['Cristhian Curiñaupa', Validators.required],
    email: ['cristhian87300@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],
  },
    {
      validators: this.passwordIguales('password', 'password2')
    }
  )

  isSubmit = false;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService
    , private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.isSubmit = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm);
    if (this.registerForm.invalid) {

      console.log('formulario incorrecto');

      return
    }
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(

      resp => {
        console.log('usuario creado');
        console.log(resp);

        this.router.navigate(['/menu']);
      },
      err => {
        console.warn(err);
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          // confirmButtonText: 'Cool'
        })
      }
    )


  }

  campoNoValido(nombre: string): boolean {
    if (this.registerForm.get(nombre).invalid && this.isSubmit) {
      return true
    }
    else {
      return false;
    }

  }

  aceptaTerminos(nombre: string): boolean {

    return (!this.registerForm.get(nombre).value && this.isSubmit)


  }

  contrasenasNoValidas(): boolean {

    const password = this.registerForm.get('password').value
    const password2 = this.registerForm.get('password2').value

    if ((password != password2) && this.isSubmit) {
      return true
    }
    else {
      return false
    }
  }

  passwordIguales(name: string, name2: string) {

    return (formGroup: FormGroup) => {
      const password = formGroup.get(name)
      const password2 = formGroup.get(name2)

      if (password.value === password2.value) {
        password2.setErrors(null)
      }
      else {
        password2.setErrors({ noEsIgual: true })
      }
    }
  }
}
