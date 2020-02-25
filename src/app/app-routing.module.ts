import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { EmptyComponent } from './recipe/empty/empty.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
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
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
