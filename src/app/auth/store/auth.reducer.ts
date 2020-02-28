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

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
    case AuthActions.SIGNUP_REQUEST:
      return {
        ...state,
        error: null,
        loading: true
      };
    case AuthActions.AUTHENTICATION_SUCCESS:
      const { id, email, token, expiresIn } = action.payload;
      const user = new User(id, email, token, expiresIn);

      return {
        ...state,
        user,
        error: null,
        loading: false
      };
    case AuthActions.AUTHENTICATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
