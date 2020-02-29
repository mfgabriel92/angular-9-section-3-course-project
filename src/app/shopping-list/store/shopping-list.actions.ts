import { createAction, props } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction(
  '[Shopping] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);
export const addIngredients = createAction(
  '[Shopping] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);
export const startEditing = createAction(
  '[Shopping] Start Editing',
  props<{ index: number }>()
);
export const stopEditing = createAction('[Shopping] Stop Editing');
export const updateIngredient = createAction(
  '[Shopping] Update Ingredient',
  props<{ ingredient: Ingredient }>()
);
export const deleteIngredient = createAction('[Shopping] Delete Ingredient');

// export class AddIngredient implements Action {
//   readonly type = ADD_INGREDIENT;
//   constructor(public payload: Ingredient) {}
// }

// export class AddIngredients implements Action {
//   readonly type = ADD_INGREDIENTS;
//   constructor(public payload: Ingredient[]) {}
// }

// export class StartEditing implements Action {
//   readonly type = START_EDITING;
//   constructor(public payload: number) {}
// }

// export class StopEditing implements Action {
//   readonly type = STOP_EDITING;
// }

// export class UpdateIngredient implements Action {
//   readonly type = UPDATE_INGREDIENT;
//   constructor(public payload: Ingredient) {}
// }

// export class DeleteIngredient implements Action {
//   readonly type = DELETE_INGREDIENT;
// }

// export type ShoppingListActions =
//   | AddIngredient
//   | AddIngredients
//   | StartEditing
//   | StopEditing
//   | UpdateIngredient
//   | DeleteIngredient;
