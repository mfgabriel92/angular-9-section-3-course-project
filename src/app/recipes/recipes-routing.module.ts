import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth-guard.service';
import { RecipeComponent } from './recipes.component';
import { EmptyComponent } from './empty/empty.component';
import { RecipeEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipeDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeResolverService } from './recipes-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'recipes',
    component: RecipeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: EmptyComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
