import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomePageService } from '../home-page/home-page.service';
import {FormControl, Validators, FormGroup } from '@angular/forms';


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

  newGroup: FormGroup;
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

  // onAdd(data) {
  //   console.log(data,'i was called', this.data);
  //   this.dialogRef.close(this.data)
  // }

  onClick() {
    console.log('i was pressed', this.newGroup.value);
    (this.data.id) ?  this.updateData(this.newGroup.value) : this.setData(this.newGroup.value);
  }

  initForm = () => {
    this.newGroup = new FormGroup({
      enrollmentId: new FormControl(this.data.enrollmentId),
      name: new FormControl(this.data.name),
      age: new FormControl(this.data.age),
      sex: new FormControl(this.data.sex),
      percentage: new FormControl(this.data.percentage),
      id: new FormControl(this.data.id)
    });
  }

  setData(data) {
    this.homeService.setData(data)
      .subscribe(
        response => {
          console.log('response is', response  );
          let newData;
          // if(response){
          //   newData = {...data, id: response.name};
          // }
          // else {
          newData = {...data };
          // }
          console.log('newData === ', newData);
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
          console.log('update response is', response  );
          // let newData;
          // if(response.name){
          //   newData = {...data, id: response.name};
          // }
          // else {
          //   newData = {...data };
          // }
          // console.log('newData === ', newData)
          this.dialogRef.close(true);
        },
        error => {
          // this.error.next(error.message);
          console.log(error, ' error found ', error);
        }
      );
  }


}
