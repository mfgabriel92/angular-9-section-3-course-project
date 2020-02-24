import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  fetch(): Observable<Recipe[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          `https://ng-9-recipe-book.firebaseio.com/recipes.json?auth=${user.userToken}`
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ?? [] };
        });
      }),
      tap(recipes => this.recipeService.setRecipes(recipes))
    );
  }

  store(): Observable<object> {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(
      'https://ng-9-recipe-book.firebaseio.com/recipes.json',
      recipes
    );
  }
}
