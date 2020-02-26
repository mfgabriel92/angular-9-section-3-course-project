import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlertComponent, LoadingComponent],
  imports: [RouterModule, CommonModule, FormsModule],
  exports: [
    AlertComponent,
    LoadingComponent,
    RouterModule,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
