import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}


/**
 * 
 * import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  elementData = ELEMENT_DATA;
  displayedColumns: string[] = ['id', 'name', 'age', 'sex', 'percentage', 'qq'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    console.log('ng on init called')
    this.dataSource.paginator = this.paginator;
  }

  deleteData(data) {
    this.elementData.splice(0, 1);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  id: number;
  age: number;
  sex: string;
  percentage: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', age: 1.0079, sex: 'H', percentage: '66%'},
  {id: 2, name: 'Helium', age: 4.0026, sex: 'He',percentage: '66%'},
  {id: 3, name: 'Lithium', age: 6.941, sex: 'Li', percentage: '66%'},
  {id: 4, name: 'Beryllium', age: 9.0122, sex: 'Be', percentage: '66%'},
  {id: 5, name: 'Boron', age: 10.811, sex: 'B', percentage: '66%'},
  {id: 6, name: 'Carbon', age: 12.0107, sex: 'C', percentage: '66%'},
  {id: 7, name: 'Nitrogen', age: 14.0067, sex: 'N', percentage: '66%'},
  {id: 8, name: 'Oxygen', age: 15.9994, sex: 'O', percentage: '66%'},
  {id: 9, name: 'Fluorine', age: 18.9984, sex: 'F', percentage: '66%'},
  {id: 10, name: 'Neon', age: 20.1797, sex: 'Ne', percentage: '66%'},
  {id: 11, name: 'Sodium', age: 22.9897, sex: 'Na', percentage: '66%'},
  {id: 12, name: 'Magnesium', age: 24.305, sex: 'Mg', percentage: '66%'},
  {id: 13, name: 'Aluminum', age: 26.9815, sex: 'Al', percentage: '66%'},
  {id: 14, name: 'Silicon', age: 28.0855, sex: 'Si', percentage: '66%'},
  {id: 15, name: 'Phosphorus', age: 30.9738, sex: 'P', percentage: '66%'},
  {id: 16, name: 'Sulfur', age: 32.065, sex: 'S', percentage: '66%'},
  {id: 17, name: 'Chlorine', age: 35.453, sex: 'Cl', percentage: '66%'},
  {id: 18, name: 'Argon', age: 39.948, sex: 'Ar', percentage: '66%'},
  {id: 19, name: 'Potassium', age: 39.0983, sex: 'K', percentage: '66%'},
  {id: 20, name: 'Calcium', age: 40.078, sex: 'Ca', percentage: '66%'},
];

 */