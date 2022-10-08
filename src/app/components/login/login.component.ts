import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInData } from 'src/app/models/sigin.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isFormInValid = false;
  areCredentialIsInvalid = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    //console.log('login component');
    const token = localStorage.getItem('authToken');
    if (!!token) {
      this.router.navigate(['users']);
    }
  }

  ngOnInit(): void {}

  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormInValid = true;
      this.areCredentialIsInvalid = false;
      return;
    }

    this.checkCredentials(signInForm);
  }

  private checkCredentials(signInForm: NgForm) {
    const signInData = new SignInData(
      signInForm.value.email,
      signInForm.value.password
    );

    /*if (!this.authService.authenticate(signInData)) {
      this.isFormInValid = false;
      this.areCredentialIsInvalid = true;
    }*/

    this.authService.authenticate01(signInData).subscribe({
      next: (res) => {
        this.router.navigate(['users']);
      },
      error: (err) => {
        //console.log(response);
        this.isFormInValid = false;
        this.areCredentialIsInvalid = true;
      },
    });
  }
}
