import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipeEditComponent } from './recipes-edit/recipes-edit.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    EmptyComponent
  ],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class RecipesModule {}
