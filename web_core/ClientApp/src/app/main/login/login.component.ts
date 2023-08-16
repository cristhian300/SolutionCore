import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
;
import { ConfigurationService } from '../providers/services/configuration/configuration.service';
import { ITokenResponse, LoginRequest } from '../providers/services/login/login.interface';
import { LoginService } from '../providers/services/login/login.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLoading: boolean;
  public loginForm: FormGroup;
  private storage: any


  constructor(

    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,

    // private loginService: CoreService,
    private configurationService: ConfigurationService,
    private loginService: LoginService,
    private ngxLoader: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.isLoading = false;

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {

  }

  login() {

    if (!this.loginForm.valid) {
      this.snackBar.open('Complete los datos requeridos.', 'close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }


    this.ngxLoader.start();
    this.loginService.login(this.loginForm.value).subscribe(
      (response: ITokenResponse) => {

        if (response.payload) {
          localStorage.setItem("TokenUserN", JSON.stringify(response.payload.token))
          this.snackBar.open("Logeo exitoso", 'close', { duration: 3000 });
          this.router.navigateByUrl("/usuarios").then();
        } else {
          this.snackBar.open("Revise su usuario o contraseña", 'close', { duration: 3000 });
        }
        this.ngxLoader.stop();
      },
      (error ) => {
        // console.log("login error", error);
        // this.snackBar.open(error.message, 'close', { duration: 3000 });
        this.ngxLoader.stop();
      });
  }


  ErrorHandler() {
    this.isLoading = false;
  }

}
