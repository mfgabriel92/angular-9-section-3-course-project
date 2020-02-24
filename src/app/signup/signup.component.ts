import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;

  constructor() {}

  ngOnInit(): void {}

  onSubmitClick(): void {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }
}
