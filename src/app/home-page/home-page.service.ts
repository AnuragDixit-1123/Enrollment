import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentData } from './student.model';


@Injectable({ providedIn: 'root' })
export class HomePageService {

constructor(private http: HttpClient) {}

fetchData() {


}

setData() {

    this.http
    .post<StudentData>

}
}