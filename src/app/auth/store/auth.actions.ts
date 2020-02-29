import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

export const signupRequest = createAction(
  '[Auth] Signup Request',
  props<{ email: string; password: string }>()
);
export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ email: string; password: string }>()
);
export const authenticationSuccess = createAction(
  '[Auth] Authentication Success',
  props<{ user: User; redirect: boolean }>()
);
export const authenticationFailure = createAction(
  '[Auth] Login Failure',
  props<{ message: string }>()
);
export const autoLogin = createAction('[Auth] Auto Login');
export const logout = createAction('[Auth] Logout');
export const clearErrors = createAction('[Auth] Clear Errors');
