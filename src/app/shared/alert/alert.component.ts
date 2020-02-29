import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() message: string;

  constructor(private store: Store<fromApp.AppState>) {}

  onOkClick(): void {
    this.store.dispatch(AuthActions.clearErrors());
  }
}
