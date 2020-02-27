import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/internal/Subscription';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  isEditingIngredient = false;
  editingIngredientIndex: number;
  editingIngredientItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientEditing.subscribe(
      (i: number) => {
        this.editingIngredientIndex = i;
        this.isEditingIngredient = true;
        this.editingIngredientItem = this.shoppingListService.getIngredient(i);
        this.ingredientForm.form.setValue(this.editingIngredientItem);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmitClick(): void {
    const { name, amount } = this.ingredientForm.form.value;
    const ingredient = new Ingredient(name, amount);

    if (this.isEditingIngredient) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.editingIngredientIndex,
          ingredient
        })
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.onResetClick();
  }

  onDeleteClick(): void {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.editingIngredientIndex)
    );
    this.onResetClick();
  }

  onResetClick(): void {
    this.ingredientForm.form.reset();
    this.isEditingIngredient = false;
  }
}
