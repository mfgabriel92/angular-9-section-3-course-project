import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  isEditingIngredient = false;
  editingIngredientItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(state => {
      if (state.editingIngredientIndex === -1) {
        this.isEditingIngredient = false;
        return;
      }

      this.isEditingIngredient = true;
      this.ingredientForm.form.setValue(state.editingIngredient);
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }

  onSubmitClick(): void {
    const { name, amount } = this.ingredientForm.form.value;
    const ingredient = new Ingredient(name, amount);

    if (this.isEditingIngredient) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.onResetClick();
  }

  onDeleteClick(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onResetClick();
  }

  onResetClick(): void {
    this.ingredientForm.form.reset();
    this.isEditingIngredient = false;
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }
}
