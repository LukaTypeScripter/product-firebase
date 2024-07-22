import {Component, inject} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";

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
  private fireStoreService = inject(FirestoreService)

  handleSelectCategory(category:string) {
    this.selectedCategory = category;
    this.fireStoreService.categoryType.next(this.selectedCategory)
    this.fireStoreService.sortOption.next("")
  }

}
