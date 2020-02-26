import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';

import { RecipesApiService } from './recipes-api.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private recipeApi: RecipesApiService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    return recipes.length > 0 ? recipes : this.recipeApi.fetch();
  }
}
