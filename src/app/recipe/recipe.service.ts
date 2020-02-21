import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import uuid from 'uuid/v4';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject();
  recipes: Recipe[] = [
    new Recipe(
      uuid(),
      'Lorem I',
      'Lorem ipsum I',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Foo', 2)]
    ),
    new Recipe(
      uuid(),
      'Lorem II',
      'Lorem ipsum II',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Bar', 7)]
    ),
    new Recipe(
      uuid(),
      'Lorem III',
      'Lorem ipsum III',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Lorem', 4)]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    return this.recipes.find(e => e.id === id);
  }

  addToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
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
