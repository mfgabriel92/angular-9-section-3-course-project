import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditing = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.isEditing = params.id != null;
      this.initForm();
    });
  }

  get controls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmitClick(): void {
    console.log(this.recipeForm);
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.isEditing) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imageUrl: new FormControl(recipeImageUrl),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }
}
