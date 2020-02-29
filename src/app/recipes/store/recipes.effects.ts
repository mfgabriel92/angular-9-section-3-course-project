import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { environment } from 'src/environments/environment';

import * as RecipesActions from './recipes.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Injectable()
export class RecipesEffects {
  fetch = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(`${environment.baseUrl}/recipes.json`);
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ?? [] };
        });
      }),
      map(recipes => RecipesActions.setRecipes({ recipes }))
    )
  );

  save = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, store]) => {
          return this.http.put<Recipe[]>(
            `${environment.baseUrl}/recipes.json`,
            store.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
