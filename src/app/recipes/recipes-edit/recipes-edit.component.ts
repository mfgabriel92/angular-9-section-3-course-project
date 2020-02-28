import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import uuid from 'uuid/v4';
import { Recipe } from '../recipe.model';

import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit, OnDestroy {
  id: string;
  isEditing = false;
  recipeForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.isEditing = params.id != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get controls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddMoreIngredientsClick() {
    this.controls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onSubmitClick(): void {
    if (this.isEditing) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          id: this.id,
          recipe: this.recipeForm.value
        })
      );
    } else {
      const {
        name,
        imageUrl,
        description,
        ingredients
      } = this.recipeForm.value;
      const recipe = new Recipe(
        uuid(),
        name,
        description,
        imageUrl,
        ingredients
      );
      this.store.dispatch(new RecipesActions.AddRecipe(recipe));
    }

    this.clearAndLeave();
  }

  onCancelClick(): void {
    this.clearAndLeave();
  }

  onDeleteClick(): void {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
  }

  onDeleteIngredientClick(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.isEditing) {
      // const recipes = this.recipeService.getRecipe(this.id);
      this.subscription = this.store
        .select('recipes')
        .pipe(map(state => state.recipes.find(e => e.id === this.id)))
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImageUrl = recipe.imageUrl;
          recipeDescription = recipe.description;

          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  private clearAndLeave(): void {
    this.recipeForm.reset();
    this.router.navigate(['/recipes']);
  }
}
