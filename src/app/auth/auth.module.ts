import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent, SignupComponent, SigninComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
