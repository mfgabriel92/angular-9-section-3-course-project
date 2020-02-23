import { RecipeApiService } from './../recipe/recipe-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private recipeApi: RecipeApiService) {}

  ngOnInit(): void {}

  onSaveClick(): void {
    this.recipeApi.store().subscribe(response => console.log(response));
  }

  onFetchClick(): void {
    this.recipeApi.fetch().subscribe();
  }
}
