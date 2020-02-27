import { Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';

export class AuthEffects {
  login = this.actions$.pipe(ofType(AuthActions.LOGIN_REQUEST));

  constructor(private actions$: Actions) {}
}
