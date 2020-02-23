import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  fetch(): Subscription {
    return this.http
      .get<Recipe[]>('https://ng-9-recipe-book.firebaseio.com/recipes.json')
      .subscribe(recipes => this.recipeService.setRecipes(recipes));
  }

  store(): Observable<object> {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(
      'https://ng-9-recipe-book.firebaseio.com/recipes.json',
      recipes
    );
  }
}
