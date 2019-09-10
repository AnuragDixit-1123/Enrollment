import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CONSTANTS  } from '../../shared/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signUpForm: FormGroup;
  isLoading = false;
  error: string  = null;
  CONSTANTS = CONSTANTS;

  constructor(private authService: AuthService, private router: Router ) {}

  ngOnInit() {
    this.initForm();
  }

  onClick() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.isLoading = true;
    this.authService.signUp(email, password)
      .subscribe(
        response => {
          this.error = null;
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
        }
      );
  }

  initForm = () => {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.compareEqualValidator])
      });
  }

   compareEqualValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.parent;
    if (password && password.value.password !==  control.value) {
       return { passwordMatch: true };
    }
    return null;
  }




  getErrorMessage(errorField) {
    switch (errorField) {
      case 'email' : {
        return this.signUpForm.get('email').hasError('required') ? 'You must enter a value' :
          this.signUpForm.get('email').hasError('email') ? 'Not a valid email' : '';
      }
      case 'password': {
        return this.signUpForm.get('password').hasError('required') ? 'You must enter a value' :
          this.signUpForm.get('password').hasError('minlength') ? 'Minimum 6 characters required' :
          '';
      }
      case 'firstName' : {
        return this.signUpForm.get('firstName').hasError('required') ? 'You must enter a value' : '';
      }
      case 'confirmPassword': {
        return this.signUpForm.get('confirmPassword').hasError('required') ? 'You must enter a value' :
          this.signUpForm.get('confirmPassword').hasError('minlength') ? 'Minimum 6 characters required' :
          this.signUpForm.get('confirmPassword').hasError('passwordMatch') ? 'Password Donot match' :
           '';
      }
      default : '';
    }
  }

  onSignInPressed() {
    this.router.navigate(['/login']);
  }
}


