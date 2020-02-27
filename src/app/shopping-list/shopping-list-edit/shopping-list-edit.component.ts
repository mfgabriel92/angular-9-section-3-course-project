import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/internal/Subscription';

import { AddIngredient } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  isEditingIngredient = false;
  editingIngredient: Subscription;
  editingIngredientIndex: number;
  editingIngredientItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.editingIngredient = this.shoppingListService.ingredientEditing.subscribe(
      (i: number) => {
        this.editingIngredientIndex = i;
        this.isEditingIngredient = true;
        this.editingIngredientItem = this.shoppingListService.getIngredient(i);
        this.ingredientForm.form.setValue(this.editingIngredientItem);
      }
    );
  }

  ngOnDestroy(): void {
    this.editingIngredient.unsubscribe();
  }

  onSubmitClick(): void {
    const { name, amount } = this.ingredientForm.form.value;
    const ingredient = new Ingredient(name, amount);

    if (this.isEditingIngredient) {
      this.shoppingListService.updateIngredient(
        this.editingIngredientIndex,
        ingredient
      );
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }

    this.onResetClick();
  }

  onDeleteClick(): void {
    this.shoppingListService.deleteIngredient(this.editingIngredientIndex);
    this.onResetClick();
  }

  onResetClick(): void {
    this.ingredientForm.form.reset();
    this.isEditingIngredient = false;
  }
}
