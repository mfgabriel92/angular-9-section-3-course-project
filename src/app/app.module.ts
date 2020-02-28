import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from './auth/auth.module';
import { environment } from 'src/environments/environment';

import * as fromApp from './store/app.reducer';
import * as fromAppEffects from './store/app.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,

    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot(fromAppEffects.appEffects),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),

    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
