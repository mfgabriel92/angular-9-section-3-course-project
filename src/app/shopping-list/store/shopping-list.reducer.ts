import { Ingredient } from '../../shared/ingredient.model';
import {
  ShoppingListActions,
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT
} from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 3),
    new Ingredient('Peaches', 7)
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case UPDATE_INGREDIENT:
      const updatedIngredient = {
        ...state.ingredients[action.payload.index],
        ...action.payload.ingredient
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return { ...state, ingredients: updatedIngredients };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((e, i) => i !== action.payload)
      };
    default:
      return state;
  }
}
