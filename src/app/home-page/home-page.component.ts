import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { HomePageService } from './home-page.service';
import { Subject } from 'rxjs';


export interface PeriodicElement {
  enrollmentId: number;
  name: string;
  age: number;
  sex: string;
  percentage: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})



export class HomePageComponent implements OnInit {

  studentData = [];
  displayedColumns: string[] = ['enrollmentId', 'name', 'age', 'sex', 'percentage', 'edit', 'delete'];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource : MatTableDataSource<PeriodicElement>;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  
  isLoading = false;
  error = new Subject<string>();

  length = 15;
  pageSize = 15;
  // pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private homeService: HomePageService, public dialog: MatDialog) {
    this.fetchData();
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // this.fetchData();
  }

  // updateStudentData(id) {
  //   const index = this.studentData.findIndex( (element) => {
  //     return element.id === id;
  //   });
  //   this.studentData.splice(index, 1);
  //   this.updateDataSource();
  // }

  onDelete(data) {

    const  confirmation = confirm("Press a button!")
    if(confirmation) {
      this.isLoading = true;

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
          this.isLoading = false;

      }
    );
    }
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
        this.fetchData();
       }
    });
  }

  fetchData() {
    this.isLoading = true;

    this.homeService.fetchData()
      .subscribe(
        response => {
            this.studentData = response;
            this.dataSource = new MatTableDataSource<PeriodicElement>(response);
            this.dataSource.sort = this.sort;
            this.length = this.studentData.length;
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;

            // console.log(this.studentData) 
            // this.updateDataSource();
        },
        error => {
            this.error.next(error.message);
            console.log(error, ' error found ', error);
            this.isLoading = false;

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
    console.log('update called', this.studentData);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.studentData);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

['identity', 'name', 'age', 'sex', 'percentage', 'edit', 'delete']

// const ELEMENT_DATA: PeriodicElement[] = [
//   {age: "23",
//   enrollmentId: "1881",
//   id: "-LoGdxwUCgWqu_k3Nrcx",
//   name: "Anurag Dixit",
//   percentage: "66",
//   sex: "Male"},
//   {age: "24",
//   enrollmentId: "1882",
//   id: "-LoGdxwUCgWqu_k3Nrcx",
//   name: "Anurag sharma",
//   percentage: "66",
//   sex: "Male"},
//  ];
