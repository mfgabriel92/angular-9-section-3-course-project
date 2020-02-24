import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  isLoading = false;
  error: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmitClick(): void {
    if (!this.signupForm.valid) {
      return;
    }

    const { email, password } = this.signupForm.value;

    this.isLoading = true;
    this.authService.signup(email, password).subscribe(
      () => (this.isLoading = false),
      ({ error }) => {
        this.error = error.error.message;
        this.isLoading = false;
      }
    );

    this.signupForm.reset();
  }
}
