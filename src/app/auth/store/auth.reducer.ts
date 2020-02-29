import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';

import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  error: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false
};

export function authReducer(authState: State | undefined, authAction: Action) {
  return createReducer(
    initialState,

    on(AuthActions.loginRequest, AuthActions.signupRequest, state => ({
      ...state,
      error: null,
      loading: true
    })),

    on(AuthActions.authenticationSuccess, (state, action) => ({
      ...state,
      error: null,
      loading: false,
      user: new User(
        action.user.id,
        action.user.email,
        action.user.token,
        action.user.expiresIn
      )
    })),

    on(AuthActions.authenticationFailure, (state, action) => ({
      ...state,
      error: action.message,
      loading: false,
      user: null
    })),

    on(AuthActions.logout, state => ({
      ...state,
      user: null
    })),

    on(AuthActions.logout, state => ({
      ...state,
      error: null
    }))
  )(authState, authAction);
}
