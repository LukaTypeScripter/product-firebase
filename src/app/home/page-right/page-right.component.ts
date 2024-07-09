import { Component } from '@angular/core';
import {PostListComponent} from "./post-list/post-list.component";

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

}
