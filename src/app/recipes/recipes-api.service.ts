import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// import { map, tap } from 'rxjs/operators';
// import { Recipe } from './recipe.model';
// import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
// import * as RecipesActions from './store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class RecipesApiService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  // fetch(): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(`${environment.baseUrl}/recipes.json`).pipe(
  //     map(recipes => {
  //       return recipes.map(recipes => {
  //         return { ...recipes, ingredients: recipes.ingredients ?? [] };
  //       });
  //     }),
  //     tap(recipes =>
  //       this.store.dispatch(new RecipesActions.SetRecipes(recipes))
  //     )
  //   );
  // }
}
