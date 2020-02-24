import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';

interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCAB6AM-jgucCt6VjPBnWLnv13KxXUY98',
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(({ error }) => {
          switch (error.error.message) {
            case 'EMAIL_EXISTS':
              return throwError(
                'The e-mail is already used by another account'
              );
            default:
              return throwError('An unknown error occurred');
          }
        }),
        tap(response => this.setUser(response))
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCAB6AM-jgucCt6VjPBnWLnv13KxXUY98',
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(({ error }) => {
          switch (error.error.message) {
            case 'INVALID_PASSWORD':
              return throwError('The credentials do not match');
            case 'EMAIL_NOT_FOUND':
              return throwError('The credentials do not match');
            default:
              return throwError('An unknown error occurred');
          }
        }),
        tap(response => this.setUser(response))
      );
  }

  private setUser(response: AuthResponse): void {
    this.user.next(
      new User(
        response.localId,
        response.email,
        response.idToken,
        new Date(new Date().getTime() + +response.expiresIn * 1000)
      )
    );
  }
}
