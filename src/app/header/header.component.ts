import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private user: Subscription;
  isLogged: boolean;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.user = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isLogged = !!user;
      });
  }

  ngOnDestroy(): void {
    this.user.unsubscribe();
  }

  onSaveClick(): void {
    // this.recipeApi.store().subscribe(response => console.log(response));
  }

  onFetchClick(): void {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogoutClick(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
