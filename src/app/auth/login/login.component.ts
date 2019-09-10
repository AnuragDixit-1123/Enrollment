import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CONSTANTS, ERROR_MESSAGES } from '../../shared/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  error: string  = null;
  CONSTANTS = CONSTANTS;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
   this.initForm();
  }

  onClick() {
    this.error = null;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;
    this.authService.login(email, password)
      .subscribe(
        response => {
          this.isLoading = false;
          this.router.navigate(['/home-page']);
        },
        error => {
          this.error = error;
          this.isLoading = false;
        }
      );
  }

  initForm = () => {
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required])
      });
  }

  getErrorMessage(errorField) {

    switch (errorField) {
      case 'email' : {
        return this.loginForm.get('email').hasError('required') ? ERROR_MESSAGES.COMMON.REQUIRED :
               this.loginForm.get('email').hasError('email') ? ERROR_MESSAGES.COMMON.EMAIL : '';
        }
      case 'password': {
        return this.loginForm.get('password').hasError('required') ? ERROR_MESSAGES.COMMON.REQUIRED : '';
        }
      default: '';
    }
  }

  onSignupPressed() {
    this.router.navigate(['/signup']);
  }
}
