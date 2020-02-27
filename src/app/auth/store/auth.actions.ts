import { Action } from '@ngrx/store';

export const LOGIN_REQUEST = '[Auth] Login Request';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
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

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
