import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

import * as AuthActions from './auth.actions';

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
  signupRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupRequest),
      switchMap(action => {
        return this.http
          .post<AuthResponse>(
            `${environment.baseAuthUrl}:signUp?key=${environment.APIkey}`,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(response =>
              this.authService.initLogoutTimer(+response.expiresIn * 1000)
            ),
            map(response => handleAuthentication(response)),
            catchError(({ error }) => handleErrors(error.error.message))
          );
      })
    )
  );

  loginRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      switchMap(action => {
        return this.http
          .post<AuthResponse>(
            `${environment.baseAuthUrl}:signInWithPassword?key=${environment.APIkey}`,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(response =>
              this.authService.initLogoutTimer(+response.expiresIn * 1000)
            ),
            map(response => handleAuthentication(response)),
            catchError(({ error }) => handleErrors(error.error.message))
          );
      })
    )
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
          return { type: '[Auth] Unauthenticated' };
        }

        const user = new User(
          storedUser.id,
          storedUser.email,
          storedUser.token,
          new Date(storedUser.expiresIn)
        );

        if (user.userToken) {
          const expiresIn = new Date(storedUser.expiresIn).getTime();
          const now = new Date().getTime();
          this.authService.initLogoutTimer(expiresIn - now);

          return AuthActions.authenticationSuccess({
            user: storedUser,
            redirect: false
          });
        }

        return { type: '[Auth] Unauthenticated' };
      })
    )
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          this.router.navigate(['/signin']);
          localStorage.removeItem('user');
        })
      ),
    { dispatch: false }
  );

  redirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticationSuccess),
        tap(action => action.redirect && this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}

const handleAuthentication = (response: AuthResponse) => {
  const user = new User(
    response.localId,
    response.email,
    response.idToken,
    new Date(new Date().getTime() + +response.expiresIn * 1000)
  );

  localStorage.setItem('user', JSON.stringify(user));

  return AuthActions.authenticationSuccess({ user, redirect: true });
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
    case 'EMAIL_EXISTS':
      errorMessage = 'The e-mail is already taken';
      break;
    default:
  }

  return of(AuthActions.authenticationFailure({ message: errorMessage }));
};
