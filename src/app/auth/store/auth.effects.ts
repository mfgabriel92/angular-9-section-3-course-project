import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

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
  login = this.actions$.pipe(
    ofType(AuthActions.LOGIN_REQUEST),
    switchMap((authData: AuthActions.LoginRequest) => {
      return this.http
        .post<AuthResponse>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.APIkey}`,
          {
            ...authData.payload,
            returnSecureToken: true
          }
        )
        .pipe(
          map(response => {
            return of(
              new AuthActions.LoginSuccess({
                id: null,
                email: response.email,
                token: response.idToken,
                expiresIn: new Date(
                  new Date().getTime() + +response.expiresIn * 1000
                )
              })
            );
          }),
          catchError(error => of())
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
