import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  newGroup: FormGroup;

  constructor(private authService: AuthService ) {}

  isLoading = false;
  error: string  = null;

  ngOnInit() {
   this.initForm();
  }

  onClick() {
    console.log('i was pressed', this.newGroup.value);

    const email = this.newGroup.value.email;
    const password = this.newGroup.value.password;

    console.log(email, password)
    this.isLoading = true
    this.authService.signUp(email, password)
      .subscribe(
        response => {
          console.log('response of signup is', response);
          this.isLoading = false;
        },
        error => {
          console.log('signup error', error);
          this.error = error;
          this.isLoading = false;

        }
      )

  }

  initForm = () => {
    this.newGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''), 
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
      })
  }

  }
  


