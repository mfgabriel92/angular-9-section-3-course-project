import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { EmptyComponent } from './empty/empty.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesDetailComponent,
    RecipesListComponent,
    RecipeItemComponent,
    RecipesEditComponent,
    EmptyComponent
  ],
  imports: [SharedModule, ReactiveFormsModule]
})
export class RecipesModule {}
