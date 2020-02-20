import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.recipe = this.recipeService.getRecipe(+id - 1);

    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(+params.id - 1);
    });
  }

  onAddToShippingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
