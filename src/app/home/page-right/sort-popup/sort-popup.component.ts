import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FirestoreService} from "../../../services/firestore.service";

@Component({
  selector: 'app-sort-popup',
  standalone: true,
  imports: [],
  templateUrl: './sort-popup.component.html',
  styleUrl: './sort-popup.component.scss'
})
export class SortPopupComponent {
  @Output() close = new EventEmitter();
  sortOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];
  selectedSortOption = 'Most Upvotes';
  private foreStoreService = inject(FirestoreService)
  onSortChange(option: string) {
    this.selectedSortOption = option;
    this.foreStoreService.sortOption.next(option)
    this.foreStoreService.categoryType.next('all')
  }
}
