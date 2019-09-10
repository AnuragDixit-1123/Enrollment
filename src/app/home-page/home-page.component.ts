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
  dataSource: MatTableDataSource<PeriodicElement>;
  isLoading = false;
  error = new Subject<string>();
  length = 10;
  pageSize = 10;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private homeService: HomePageService, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchData();
  }

  onDelete(data) {
    const  confirmation = confirm('Are you sure you want to delete');

    if (confirmation) {
      this.isLoading = true;
      this.homeService.deleteData(data.id)
      .subscribe(
        response => {
            this.fetchData();
        },
        error => {
            this.error.next(error.message);
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
        sex: 'Male'
      };
    }

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50vw',
      height: '50vh',
      data: studentData
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result ) {
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
        },
        error => {
          this.error.next(error.message);
          this.isLoading = false;
        }
      );
  }

  updateDataSource() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.studentData);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
