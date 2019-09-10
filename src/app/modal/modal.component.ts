import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomePageService } from '../home-page/home-page.service';
import {FormControl, Validators, FormGroup } from '@angular/forms';
import { CONSTANTS, ERROR_MESSAGES  } from '../shared/constant';

export interface DialogData {
  name: string;
  age: number;
  sex: string;
  percentage: string;
  id: number;
  enrollmentId: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  studentData: FormGroup;
  list = ['Male', 'Female', 'Transgender'];
  CONSTANTS = CONSTANTS;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    private homeService: HomePageService
    ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initForm();
   }

  onClick() {
    (this.data.id) ?  this.updateData(this.studentData.value) : this.setData(this.studentData.value);
  }

  initForm = () => {
    this.studentData = new FormGroup({
      enrollmentId: new FormControl(this.data.enrollmentId, [Validators.required]),
      name: new FormControl(this.data.name, [Validators.required]),
      age: new FormControl(this.data.age, [Validators.required]),
      sex: new FormControl(this.data.sex, [Validators.required]),
      percentage: new FormControl(this.data.percentage, [Validators.required]),
      id: new FormControl(this.data.id)
    });
  }

  setData(data) {
    this.homeService.setData(data)
      .subscribe(
        response => {
          this.dialogRef.close(true);
        },
        error => {
          // this.error.next(error.message);
          console.log(error, ' error found ', error);
        }
      );
  }

  updateData(data) {
    this.homeService.updateData(data)
      .subscribe(
        response => {
          console.log(response)
          this.dialogRef.close(true);
        },
        error => {
          // this.error.next(error.message);
          console.log(error, ' error found ', error);
        }
      );
  }

  getErrorMessage(errorField) {

    switch (errorField) {
      case 'enrollmentId' : {
        return this.studentData.get('enrollmentId').hasError('required') ? ERROR_MESSAGES.COMMON.REQUIRED : '';
        }
      case 'name': {
        return this.studentData.get('name').hasError('required') ? ERROR_MESSAGES.COMMON.REQUIRED : '';
        }
        case 'age' : {
          return this.studentData.get('age').hasError('required') ? ERROR_MESSAGES.COMMON.REQUIRED : '';
          }
        case 'sex': {
          return this.studentData.get('sex').hasError('required') ? ERROR_MESSAGES.COMMON.REQUIRED : '';
          }
        case 'percentage': {
          return this.studentData.get('percentage').hasError('required') ? ERROR_MESSAGES.COMMON.REQUIRED : '';
        }
      default: '';
    }
  }
}
