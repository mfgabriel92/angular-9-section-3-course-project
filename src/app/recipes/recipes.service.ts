import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject();
  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.fetchRecipes();
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    return this.recipes.find(e => e.id === id);
  }

  addToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipes: Recipe): void {
    this.recipes.push(recipes);
    this.fetchRecipes();
  }

  updateRecipe(id: string, newRecipe: Recipe): void {
    const index = this.recipes.findIndex(e => e.id === id);
    this.recipes[index] = newRecipe;
    this.fetchRecipes();
  }

  deleteRecipe(id: string): void {
    const index = this.recipes.findIndex(e => e.id === id);
    this.recipes.splice(index, 1);
    this.fetchRecipes();
  }

  private fetchRecipes(): void {
    this.recipesChanged.next(this.recipes.slice());
  }
}
