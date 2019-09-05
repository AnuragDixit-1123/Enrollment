import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentData } from './student.model';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class HomePageService {

error = new Subject<string>();

constructor(private http: HttpClient) {}

fetchData() {
    return this.http
            .get(
              'https://angularguide.firebaseio.com/studentData.json'
            )
            .pipe(
              map(responseData => {
                const postsArray = [];
                for (const key in responseData) {
                  if (responseData.hasOwnProperty(key)) {
                    postsArray.push({ ...responseData[key], id: key });
                  }
                }
                return postsArray;
              }),
              catchError(errorRes => {
                return throwError(errorRes);
              })
            );
          }


  setData(data) {
    console.log('data to send ===', data);
    return this.http
    .post(
        'https://angularguide.firebaseio.com/studentData.json',
        data
        );
  }

deleteData(data) {
    return this.http.delete(
        `https://angularguide.firebaseio.com/studentData/${data}.json`
    );
}



}
