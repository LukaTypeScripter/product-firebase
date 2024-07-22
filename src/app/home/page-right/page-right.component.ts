import {Component, inject, signal} from '@angular/core';
import {PostListComponent} from "./post-list/post-list.component";
import {Router} from "express";
import {NavigateService} from "../../services/navigate.service";
import {SortPopupComponent} from "./sort-popup/sort-popup.component";
import {sign} from "node:crypto";

@Component({
  selector: 'app-page-right',
  standalone: true,
  imports: [
    PostListComponent,
    SortPopupComponent
  ],
  templateUrl: './page-right.component.html',
  styleUrl: './page-right.component.scss'
})
export class PageRightComponent {
  private navigateService = inject(NavigateService)
  $isSortPopupOpen$ = signal(false)
  onNavigate(slug:string) {
    this.navigateService.navigateTo(slug)
  }

}
