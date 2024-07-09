import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {collection, Firestore, getDocs} from "@angular/fire/firestore";
import {FirestoreService} from "./services/firestore.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{


}
