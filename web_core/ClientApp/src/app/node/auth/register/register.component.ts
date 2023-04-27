import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  })

  isSubmit = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.isSubmit = true;
    console.log(this.registerForm.value);

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


}
