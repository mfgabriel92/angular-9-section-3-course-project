import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from '../../environments/environment';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIkey}`,
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
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.APIkey}`,
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

  autoLogin(): void {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      return;
    }

    const user = new User(
      storedUser.id,
      storedUser.email,
      storedUser.token,
      new Date(storedUser.expiresIn)
    );

    if (user.userToken) {
      this.store.dispatch(
        new AuthActions.LoginSuccess({
          id: storedUser.id,
          email: storedUser.email,
          token: storedUser.token,
          expiresIn: new Date(storedUser.expiresIn)
        })
      );
      const expiresIn =
        new Date(storedUser.expiresIn).getTime() - new Date().getTime();

      this.autoLogout(expiresIn);
    } else {
      localStorage.removeItem('user');
      this.router.navigate(['/signin']);
    }
  }

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/signin']);
    localStorage.removeItem('user');

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
  }

  autoLogout(duration: number): void {
    this.expirationTimer = setTimeout(() => this.logout(), duration);
  }

  private setUser(response: AuthResponse): void {
    const user = new User(
      response.localId,
      response.email,
      response.idToken,
      new Date(new Date().getTime() + +response.expiresIn * 1000)
    );

    this.store.dispatch(
      new AuthActions.LoginSuccess({
        id: null,
        email: response.email,
        token: response.idToken,
        expiresIn: new Date(new Date().getTime() + +response.expiresIn * 1000)
      })
    );
    localStorage.setItem('user', JSON.stringify(user));
  }
}
