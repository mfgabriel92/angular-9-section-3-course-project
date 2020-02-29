import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private expirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  initLogoutTimer(duration: number): void {
    this.expirationTimer = setTimeout(
      () => this.store.dispatch(AuthActions.logout()),
      duration
    );
  }

  clearLogoutTimer(): void {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
      this.expirationTimer = null;
    }
  }
}
