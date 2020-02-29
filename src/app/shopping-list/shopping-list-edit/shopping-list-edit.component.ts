import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';

import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  isEditingIngredient = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(state => {
      if (state.editingIngredientIndex === -1) {
        this.isEditingIngredient = false;
        return;
      }

      this.isEditingIngredient = true;
      this.ingredientForm.form.setValue(
        state.ingredients[state.editingIngredientIndex]
      );
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ShoppingListActions.stopEditing());
  }

  onSubmitClick(): void {
    const { name, amount } = this.ingredientForm.form.value;
    const ingredient = new Ingredient(name, amount);

    if (this.isEditingIngredient) {
      this.store.dispatch(ShoppingListActions.updateIngredient({ ingredient }));
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({ ingredient }));
    }

    this.onResetClick();
  }

  onDeleteClick(): void {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onResetClick();
  }

  onResetClick(): void {
    this.ingredientForm.form.reset();
    this.isEditingIngredient = false;
    this.store.dispatch(ShoppingListActions.stopEditing());
  }
}
