import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
   this.initForm();
  }

  onClick() {
    console.log('i was pressed', this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.isLoading = true;
    this.authService.login(email, password)
      .subscribe(
        response => {
          console.log('response of Login is', response);
          this.isLoading = false;
          this.router.navigate(['/homePage']);
        },
        error => {
          console.log('login error', error);
          this.error = error;
          this.isLoading = false;

        }
      )
  }

  initForm = () => {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      });

}
}
