import { Component } from '@angular/core';

@Component({
  selector: 'app-page-left',
  standalone: true,
  imports: [],
  templateUrl: './page-left.component.html',
  styleUrl: './page-left.component.scss'
})
export class PageLeftComponent {
  categories: Array<string> = ['all',"ui",'ux','Enhancement','Bug','Feature']
  selectedCategory = 'all';
  handleSelectCategory(category:string) {
    this.selectedCategory = category;
  }
}
