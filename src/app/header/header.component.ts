import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipeApiService } from './../recipe/recipe-api.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private user: Subscription;
  isLogged: boolean;

  constructor(
    private recipeApi: RecipeApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user.subscribe(user => {
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
}
