import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => params.id),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(state => state.recipes.find(e => e.id === this.id))
      )
      .subscribe(recipe => (this.recipe = recipe));
  }

  onAddToShippingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

  onDeleteClick(): void {
    this.store.dispatch(RecipesActions.deleteRecipe({ id: this.recipe.id }));
    this.router.navigate(['/recipes']);
  }
}
