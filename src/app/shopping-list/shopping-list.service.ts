import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [];
  ingredientChanged = new Subject<Ingredient[]>();
  ingredientEditing = new Subject<number>();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.fetchIngredients();
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.fetchIngredients();
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.fetchIngredients();
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.fetchIngredients();
  }

  private fetchIngredients(): void {
    return this.ingredientChanged.next(this.ingredients.slice());
  }
}
