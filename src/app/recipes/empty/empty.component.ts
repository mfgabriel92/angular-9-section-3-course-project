import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty',
  template: `
    <h5>Select a recipe</h5>
  `
})
export class EmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
