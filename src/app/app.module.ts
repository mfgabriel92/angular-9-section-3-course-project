import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthModule } from './auth/auth.module';

import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

const reducers = {
  shoppingList: shoppingListReducer
};

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),

    AuthModule,
    AuthRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
