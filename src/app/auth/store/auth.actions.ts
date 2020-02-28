import { Action } from '@ngrx/store';

export const LOGIN_REQUEST = '[Auth] Login Request';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';

export class LoginRequest implements Action {
  readonly type = LOGIN_REQUEST;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(
    public payload: {
      id: string;
      email: string;
      token: string;
      expiresIn: Date;
    }
  ) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = LoginRequest | LoginSuccess | LoginFailure | Logout;
