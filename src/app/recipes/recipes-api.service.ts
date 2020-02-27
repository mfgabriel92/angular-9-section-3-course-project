import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RecipesApiService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  fetch(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.baseUrl}/recipes.json`).pipe(
      map(recipes => {
        return recipes.map(recipes => {
          return { ...recipes, ingredients: recipes.ingredients ?? [] };
        });
      }),
      tap(recipes => this.recipeService.setRecipes(recipes))
    );
  }

  store(): Observable<object> {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(`${environment.baseUrl}/recipes.json`, recipes);
  }
}
