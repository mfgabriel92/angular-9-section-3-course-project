import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent, SignupComponent, SigninComponent],
  imports: [SharedModule]
})
export class AuthModule {}
