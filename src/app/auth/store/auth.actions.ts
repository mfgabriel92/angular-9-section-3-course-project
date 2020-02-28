import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const SIGNUP_REQUEST = '[Auth] Signup Request';
export const LOGIN_REQUEST = '[Auth] Login Request';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const AUTHENTICATION_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERRORS = '[Auth] Clear Errors';

export class SignupRequest implements Action {
  readonly type = SIGNUP_REQUEST;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginRequest implements Action {
  readonly type = LOGIN_REQUEST;

  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;

  constructor(public payload: User) {}
}

export class AuthenticationFailure implements Action {
  readonly type = AUTHENTICATION_FAILURE;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearErrors implements Action {
  readonly type = CLEAR_ERRORS;
}

export type AuthActions =
  | SignupRequest
  | LoginRequest
  | AutoLogin
  | AuthenticationSuccess
  | AuthenticationFailure
  | Logout
  | ClearErrors;
