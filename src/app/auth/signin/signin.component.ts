import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  isLoading = false;
  error: string;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {}

  onSubmitClick(): void {
    if (!this.signupForm.valid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const { email, password } = this.signupForm.value;

    this.store.dispatch(new AuthActions.LoginRequest({ email, password }));
    this.signupForm.reset();
  }
}
