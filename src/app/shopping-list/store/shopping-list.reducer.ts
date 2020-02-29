import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editingIngredientIndex: number;
}

const initialState: State = {
  ingredients: [],
  editingIngredientIndex: -1
};

export function shoppingListReducer(
  shoppingListState: State | undefined,
  shoppingListAction: Action
) {
  return createReducer(
    initialState,

    on(ShoppingListActions.addIngredient, (state, action) => ({
      ...state,
      ingredients: [...state.ingredients, action.ingredient]
    })),

    on(ShoppingListActions.addIngredients, (state, action) => ({
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients]
    })),

    on(ShoppingListActions.startEditing, (state, action) => ({
      ...state,
      editingIngredientIndex: action.index
    })),

    on(ShoppingListActions.stopEditing, state => ({
      ...state,
      editingIngredientIndex: -1
    })),

    on(ShoppingListActions.updateIngredient, (state, action) => ({
      ...state,
      editingIngredientIndex: -1,
      ingredients: state.ingredients.map((e, i) =>
        i === state.editingIngredientIndex ? { ...action.ingredient } : e
      )
    })),

    on(ShoppingListActions.deleteIngredient, state => ({
      ...state,
      editingIngredientIndex: -1,
      ingredients: state.ingredients.filter(
        (_, i) => i !== state.editingIngredientIndex
      )
    }))
  )(shoppingListState, shoppingListAction);
}
