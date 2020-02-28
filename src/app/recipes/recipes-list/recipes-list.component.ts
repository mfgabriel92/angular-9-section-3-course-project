import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';

import * as fromApp from 'src/app/store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('recipes')
      .pipe(map(state => state.recipes))
      .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
  }
}
