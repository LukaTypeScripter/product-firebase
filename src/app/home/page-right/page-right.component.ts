import {Component, inject} from '@angular/core';
import {PostListComponent} from "./post-list/post-list.component";
import {Router} from "express";
import {NavigateService} from "../../services/navigate.service";

@Component({
  selector: 'app-page-right',
  standalone: true,
  imports: [
    PostListComponent
  ],
  templateUrl: './page-right.component.html',
  styleUrl: './page-right.component.scss'
})
export class PageRightComponent {
  private navigateService = inject(NavigateService)

  onNavigate(slug:string) {
    this.navigateService.navigateTo(slug)
  }

}
