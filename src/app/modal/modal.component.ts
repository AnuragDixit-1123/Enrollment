import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomePageService } from '../home-page/home-page.service';


export interface DialogData {
  name: string;
  age: number;
  sex: string;
  percentage: string;
  id: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent  {

  constructor(
    public dialogRef: MatDialogRef<Any>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    private homeService: HomePageService
    ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(data) {
    console.log(data,'i was called', this.data);
    this.dialogRef.close(this.data)
  }

  // setData(data) {
  //   this.homeService.setData(data)
  //     .subscribe(
  //       response => {
  //         console.log('response is', response  );
  //         const newData = {...data, id: response.name};
  //         console.log('final data ', newData);
  //         // this.studentData.push(newData);
  //         // this.updateDataSource();
  //       },
  //       error => {
  //         // this.error.next(error.message);
  //         console.log(error, ' error found ', error);
  //       }
  //     );
  // }

}
