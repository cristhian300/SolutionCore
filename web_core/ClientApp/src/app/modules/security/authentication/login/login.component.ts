import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { GetTokenRequest } from 'src/app/agent/Authentication/request/GetTokenRequest';
import { StorageService } from 'src/app/services/common/storage.service';
import { ConfigurationResponse } from 'src/app/services/configuration/configuration';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { CoreService } from 'src/app/services/core.service';

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
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,

    private loginService: CoreService,
    private configurationService: ConfigurationService,

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

    this.isLoading = true;
    const _self = this;


    const param = new GetTokenRequest();
    param.userName = this.loginForm.get('userName').value
    param.password = this.loginForm.get('password').value

    this.configurationService.getConfiguration().subscribe(
      (response: ConfigurationResponse) => {
        if (response) {
          // console.log('configuration',response);
          this.storageService.store('configuration', response)

          this.loginService.login(param).subscribe(
            response => {
              const successLogin = response.token
              if (successLogin) {
                // console.log("Token " + response.token);
                localStorage.setItem("User", JSON.stringify(response.token));
                this.router.navigateByUrl("/usuarios").then();
              } else {

                this.snackBar.open(response.token, 'close', { duration: 3000 });
              }
              this.isLoading = false;
            },
            () => {

            });

        }

      }
    );




  }


  ErrorHandler() {
    this.isLoading = false;
  }

}