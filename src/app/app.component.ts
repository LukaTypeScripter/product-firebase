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
export class AppComponent implements OnInit{
  productRequests: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getProductRequests().subscribe(data => {
      console.log(data,"123")
      this.productRequests = data;
    });
  }

  addProductRequest() {
    const newRequest = {
      title: 'New Request',
      category: 'enhancement',
      upvotes: 0,
      status: 'suggestion',
      description: 'Description here'
    };
    console.log("came")
    this.firestoreService.addProductRequest(newRequest);
  }

}
