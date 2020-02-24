import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCAB6AM-jgucCt6VjPBnWLnv13KxXUY98`;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.BASE_URL, {
        email,
        password,
        returnSecureToken: true
      })
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
        })
      );
  }
}
