import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import uuid from 'uuid/v4';

import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators
} from '@angular/forms';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit {
  id: string;
  isEditing = false;
  recipeForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.isEditing = params.id != null;
      this.initForm();
    });
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
    const { name, imageUrl, description, ingredients } = this.recipeForm.value;
    const recipes = new Recipe(
      uuid(),
      name,
      description,
      imageUrl,
      ingredients
    );

    if (this.isEditing) {
      this.recipeService.updateRecipe(this.id, recipes);
    } else {
      this.recipeService.addRecipe(recipes);
    }

    this.clearAndLeave();
  }

  onCancelClick(): void {
    this.clearAndLeave();
  }

  onDeleteClick(): void {
    this.recipeService.deleteRecipe(this.id);
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
      const recipes = this.recipeService.getRecipe(this.id);
      recipeName = recipes.name;
      recipeImageUrl = recipes.imageUrl;
      recipeDescription = recipes.description;

      if (recipes.ingredients) {
        for (const ingredient of recipes.ingredients) {
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
