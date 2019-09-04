import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent  {

  // constructor(
  //   public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
