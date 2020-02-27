import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: ShoppingListState;
}

export interface ShoppingListState {
  ingredients: Ingredient[];
  editingIngredient: Ingredient;
  editingIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [],
  editingIngredient: null,
  editingIngredientIndex: -1
};

export function shoppingListReducer(
  state: ShoppingListState = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.START_EDITING:
      return {
        ...state,
        editingIngredient: { ...state.ingredients[action.payload] },
        editingIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDITING:
      return {
        ...state,
        editingIngredient: null,
        editingIngredientIndex: -1
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredient = {
        ...state.ingredients[action.payload.index],
        ...action.payload.ingredient
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return { ...state, ingredients: updatedIngredients };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((e, i) => i !== action.payload)
      };
    default:
      return state;
  }
}
