import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipes: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipes = this.recipeService.getRecipe(params.id);
    });
  }

  onAddToShippingList() {
    this.recipeService.addToShoppingList(this.recipes.ingredients);
  }

  onDeleteClick(): void {
    this.recipeService.deleteRecipe(this.recipes.id);
    this.router.navigate(['/recipes']);
  }
}
