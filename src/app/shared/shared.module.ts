import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [AlertComponent, LoadingComponent],
  imports: [BrowserModule, RouterModule, CommonModule, FormsModule],
  exports: [
    AlertComponent,
    LoadingComponent,
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
