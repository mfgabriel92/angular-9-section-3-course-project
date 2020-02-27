import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RecipesApiService } from './../recipes/recipes-api.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private user: Subscription;
  isLogged: boolean;

  constructor(
    private recipeApi: RecipesApiService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

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
    this.recipeApi.store().subscribe(response => console.log(response));
  }

  onFetchClick(): void {
    this.recipeApi.fetch().subscribe();
  }

  onLogoutClick(): void {
    this.authService.logout();
  }
}
