import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipe.model';
import { environment } from 'src/environments/environment';

import * as RecipesActions from './recipes.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetch = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(`${environment.baseUrl}/recipes.json`)
        .pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return { ...recipe, ingredients: recipe.ingredients ?? [] };
            });
          }),
          map(recipes => new RecipesActions.SetRecipes(recipes))
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
