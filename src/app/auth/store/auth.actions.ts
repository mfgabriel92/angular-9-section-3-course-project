import { Action } from '@ngrx/store';

export const LOGIN_REQUEST = '[Auth] Login Request';
export const SIGNUP_REQUEST = '[Auth] Signup Request';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const AUTHENTICATION_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERRORS = '[Auth] Clear Errors';

export class LoginRequest implements Action {
  readonly type = LOGIN_REQUEST;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;

  constructor(
    public payload: {
      id: string;
      email: string;
      token: string;
      expiresIn: Date;
    }
  ) {}
}

export class AuthenticationFailure implements Action {
  readonly type = AUTHENTICATION_FAILURE;

  constructor(public payload: string) {}
}

export class SignupRequest implements Action {
  readonly type = SIGNUP_REQUEST;

  constructor(public payload: { email: string; password: string }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearErrors implements Action {
  readonly type = CLEAR_ERRORS;
}

export type AuthActions =
  | LoginRequest
  | SignupRequest
  | AuthenticationSuccess
  | AuthenticationFailure
  | Logout
  | ClearErrors;
