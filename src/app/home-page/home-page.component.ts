import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { HomePageService } from './home-page.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  studentData = [];
  displayedColumns: string[] = ['identity', 'name', 'age', 'sex', 'percentage', 'edit', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.studentData);
  error = new Subject<string>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private homeService: HomePageService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchData();
  }

  updateStudentData(id) {
    const index = this.studentData.findIndex( (element) => {
      return element.id === id;
    });
    this.studentData.splice(index, 1);
    this.updateDataSource();
  }

  onDelete(data) {
    this.homeService.deleteData(data.id)
     .subscribe(
      response => {
          console.log('response is', response);
          // this.updateStudentData(data.id);
          this.fetchData();
      },
      error => {
          this.error.next(error.message);
          console.log(error, ' error found ', error);
      }
    );
  }

  openModel(data) {
    let studentData = data;

    if (!data) {
       studentData = {
        age: null,
        enrollmentId: null,
        id: '',
        name: '',
        percentage: '',
        sex: ''
       };
     }

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50vw',
      height: '50vh',
      data: studentData
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(result);
       if (result ) {
        //  console.log('result found ', result)
        // this.studentData.push(result);
        // this.updateDataSource();
        this.fetchData()
       }
    });
  }

  fetchData() {
    this.homeService.fetchData()
      .subscribe(
        response => {
            this.studentData = response;
            this.updateDataSource();
        },
        error => {
            this.error.next(error.message);
            console.log(error, ' error found ', error);
        }
      );
  }

  // setData(data) {
  //   this.homeService.setData(data)
  //     .subscribe(
  //       response => {
  //         console.log('response is', response  );
  //           const newData = {...data}
  //           //  id: response.name};
  //         console.log('final data ', newData);
  //         this.studentData.push(newData);
  //         this.updateDataSource();
  //       },
  //       error => {
  //         // this.error.next(error.message);
  //         console.log(error, ' error found ', error);
  //       }
  //     );
  // }


  updateDataSource() {
    console.log('update called', this.studentData)
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.studentData);
  }
}


export interface PeriodicElement {
  enrollmentId: number;
  name: string;
  age: number;
  sex: string;
  percentage: string;
}
