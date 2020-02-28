import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  signupRequest = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_REQUEST),
    switchMap((action: AuthActions.SignupRequest) => {
      return this.http
        .post<AuthResponse>(
          `${environment.baseAuthUrl}:signUp?key=${environment.APIkey}`,
          {
            ...action.payload,
            returnSecureToken: true
          }
        )
        .pipe(
          map(response => handleAuthentication(response)),
          catchError(({ error }) => handleErrors(error.error.message))
        );
    })
  );

  @Effect()
  loginRequest = this.actions$.pipe(
    ofType(AuthActions.LOGIN_REQUEST),
    switchMap((action: AuthActions.LoginRequest) => {
      return this.http
        .post<AuthResponse>(
          `${environment.baseAuthUrl}:signInWithPassword?key=${environment.APIkey}`,
          {
            ...action.payload,
            returnSecureToken: true
          }
        )
        .pipe(
          map(response => handleAuthentication(response)),
          catchError(({ error }) => handleErrors(error.error.message))
        );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    tap(() => this.router.navigate(['/']))
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}

const handleAuthentication = (response: AuthResponse) => {
  return new AuthActions.AuthenticationSuccess({
    id: null,
    email: response.email,
    token: response.idToken,
    expiresIn: new Date(new Date().getTime() + +response.expiresIn * 1000)
  });
};

const handleErrors = (message: string) => {
  let errorMessage = 'An unknown error happened';

  switch (message) {
    case 'INVALID_PASSWORD':
      errorMessage = 'The credentials do not match';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'The e-mail does not exist';
      break;
    default:
  }

  return of(new AuthActions.AuthenticationFailure(errorMessage));
};
