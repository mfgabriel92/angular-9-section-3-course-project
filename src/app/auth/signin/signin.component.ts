import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  loading: boolean;
  error: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
      this.error = state.error;
    });
  }

  onSubmitClick(): void {
    if (!this.signupForm.valid) {
      return;
    }

    const { email, password } = this.signupForm.value;

    this.store.dispatch(AuthActions.loginRequest({ email, password }));
    this.signupForm.reset();
  }
}
