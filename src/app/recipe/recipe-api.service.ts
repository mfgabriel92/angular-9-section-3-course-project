import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  store(): Observable<object> {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(
      'https://ng-9-recipe-book.firebaseio.com/recipes.json',
      recipes
    );
  }
}
