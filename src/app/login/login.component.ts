import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
   
  ngOnInit() {
   this.initForm()
  }
  
  onClick() {
    console.log('i was pressed', this.loginForm.value)
  }

  initForm = () => {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
      })

}
}
