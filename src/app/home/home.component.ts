import { Component } from '@angular/core';
import {PageLeftComponent} from "./page-left/page-left.component";
import {PageRightComponent} from "./page-right/page-right.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageLeftComponent,
    PageRightComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
