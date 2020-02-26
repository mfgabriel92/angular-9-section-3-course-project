import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipeEditComponent } from './recipes-edit/recipes-edit.component';
import { EmptyComponent } from './empty/empty.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    EmptyComponent
  ],
  imports: [SharedModule, ReactiveFormsModule]
})
export class RecipesModule {}
