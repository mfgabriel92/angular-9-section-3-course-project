import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';

import { Recipe } from './recipe.model';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(_: ActivatedRouteSnapshot, __: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map(state => state.recipes),
      switchMap(recipes => {
        if (recipes.length !== 0) {
          return of(recipes);
        }

        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
      })
    );
  }
}
