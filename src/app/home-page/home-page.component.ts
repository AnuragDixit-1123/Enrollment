import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface DialogData {
  name: string;
  age: number;
  sex: string;
  percentage: string;
  id: number;
}


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'sex', 'percentage', 'edit', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete() {
    console.log('delete pressed')
  }

  onEdit(data) {
    console.log('edit pressed', data)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      
    });
  }
}



@Component({
  selector: 'app-modal',
  templateUrl: '../modal/modal.component.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}









export interface PeriodicElement {
  id: number;
  name: string;
  age: number;
  sex: string;
  percentage: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1881, name: 'Anurag Dixit', age: 21, sex: 'Male', percentage: '66%' },
  { id: 1881, name: 'Anurag Dixit', age: 21, sex: 'Male', percentage: '66%' },
  { id: 1881, name: 'Anurag Dixit', age: 21, sex: 'Male', percentage: '66%' },
  { id: 1881, name: 'Anurag Dixit', age: 21, sex: 'Male', percentage: '66%' },
];

