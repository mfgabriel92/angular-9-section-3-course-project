import { Recipe } from '../recipe.model';

import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipesReducer(
  state = initialState,
  action: RecipesActions.RecipesAction
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const index = state.recipes.findIndex(e => e.id === action.payload.id);

      const updatedRecipe = {
        ...state.recipes[index],
        ...action.payload.recipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(e => e.id !== action.payload)
      };
    default:
      return state;
  }
}
