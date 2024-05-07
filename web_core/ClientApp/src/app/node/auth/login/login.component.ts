import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef

  public loginForm = this.fb.group({
    // nombre: ['Cristhian Curiñaupa', Validators.required],
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],

    remember: [false]
  },

  )

  isSubmit = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private zone: NgZone
  ) { }
  ngAfterViewInit(): void {
    this.googleInit()
  }

  ngOnInit(): void {

  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "631666904158-chd1jhu72d4s4vb38rcdr7uvosj8uiam.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }

  handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    this.usuarioService.loginGoogle(response.credential).subscribe(
      resp => {
        //aqui devuelve los datos de usuario logueado
        this.zone.run(() => {
          this.router.navigate(['/home'])
        });

      },
      err => {
        console.warn(err);
      }
    )
  }




  login() {
    // this.router.navigateByUrl('/')
    this.usuarioService.login(this.loginForm.value)
      .subscribe(x => {

        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value)
        }
        else {
          localStorage.removeItem('email')
        }
        this.router.navigateByUrl('/menu')
        console.log(x);

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

}


