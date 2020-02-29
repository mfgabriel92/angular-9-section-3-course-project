import { Action, createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';

import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipesReducer(
  recipesState: State | undefined,
  recipesAction: Action
) {
  return createReducer(
    initialState,

    on(RecipesActions.setRecipes, (state, action) => ({
      ...state,
      recipes: [...action.recipes]
    })),

    on(RecipesActions.addRecipe, (state, action) => ({
      ...state,
      recipes: [...state.recipes, action.recipe]
    })),

    on(RecipesActions.addRecipe, (state, action) => ({
      ...state,
      recipes: [...state.recipes, action.recipe]
    })),

    on(RecipesActions.updateRecipe, (state, action) => {
      const index = state.recipes.findIndex(e => e.id === action.id);

      return {
        ...state,
        recipes: state.recipes.map((e, i) =>
          i === index ? { ...action.recipe } : e
        )
      };
    })
  )(recipesState, recipesAction);
}
