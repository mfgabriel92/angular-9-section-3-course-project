import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [AlertComponent, LoadingComponent],
  imports: [RouterModule, CommonModule],
  exports: [AlertComponent, LoadingComponent, RouterModule, CommonModule]
})
export class SharedModule {}
