import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  newGroup: FormGroup;
   
  ngOnInit() {
   this.initForm()
  }
  
  onClick() {
    console.log('i was pressed', this.newGroup.value)
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
  


