import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  isLoading = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmitClick(): void {
    if (!this.signupForm.valid) {
      return;
    }

    const { email, password } = this.signupForm.value;

    this.isLoading = true;
    this.error = null;
    this.authService.login(email, password).subscribe(
      () => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
    this.signupForm.reset();
  }
}