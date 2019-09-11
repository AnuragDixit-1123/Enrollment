import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { ERROR_MESSAGES } from '../shared/constant';
import { environment } from '../../environments/environment';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    expiresIn: string;
    regitered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

user = new BehaviorSubject<User>(null);
token: string = null;
tokenTimer: any = null;

constructor( private http: HttpClient, private router: Router) {}

signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
            {
              email,
              password,
              returnSecureToken: true
            })
            .pipe(
            catchError(this.handleError),
              tap(resData => {
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            })
          );
    }

    login(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
               {
                 email,
                 password,
                 returnSecureToken: true
               })
              .pipe(
               catchError(this.handleError),
               tap(resData => {
                 this.handleAuthentication(
                   resData.email,
                   resData.localId,
                   resData.idToken,
                   +resData.expiresIn
                 );
               })
             );
     }

     autoLogin() {
       const userData: {
         email: string;
         id: string;
         _token: string;
         _tokenExpirationDate: string;
       } = JSON.parse(localStorage.getItem('userData'));
       if ( !userData ) {
         return ;
       }
       const loaderUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate) );

       if ( loaderUser.token ) {
           this.user.next(loaderUser);
           const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
           this.autoLogout(expirationDuration);
        }
      }

    logout() {
      this.user.next(null);
      this.router.navigate(['/login']);
      localStorage.removeItem('userData');
      if ( this.tokenTimer) {
        clearTimeout(this.tokenTimer);
      }
      this.tokenTimer = null;
    }

    autoLogout(expirationDuration: number) {
       this.tokenTimer = setTimeout(() => {
       this.logout();
       }, expirationDuration);
    }

    private handleAuthentication(
      email: string,
      userId: string,
      token: string,
      expiresIn: number
    ) {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user) );
    }

    private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = ERROR_MESSAGES.LOGIN.STATIC_ERROR;
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = ERROR_MESSAGES.LOGIN.EMAIL_EXISTS;
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = ERROR_MESSAGES.LOGIN.EMAIL_NOT_FOUND;
          break;
        case 'INVALID_PASSWORD':
          errorMessage = ERROR_MESSAGES.LOGIN.INVALID_PASSWORD;
          break;
      }
      return throwError(errorMessage);
    }
}
