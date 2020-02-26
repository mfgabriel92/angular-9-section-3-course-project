import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthModule } from './auth/auth.module';

import { RecipesRoutingModule } from './recipes/recipes-routing.module';

import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListRoutingModule } from './shopping-list/shopping-list-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule,

    AppRoutingModule,
    HttpClientModule,

    AuthModule,
    AuthRoutingModule,

    RecipesRoutingModule,

    ShoppingListModule,
    ShoppingListRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
