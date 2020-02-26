import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipes: Recipe;

  constructor() {}

  ngOnInit() {}
}
