import {Component, inject, OnInit} from '@angular/core';
import {FirestoreService} from "../../../services/firestore.service";
import {map, Observable} from "rxjs";
import {Post} from "../../../models/post.interface";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  private fireStoreService = inject(FirestoreService)
  posts$!: Observable<Post[]>

  ngOnInit() {
   this.posts$ = this.fireStoreService.getProductRequests()
  }

  upvote(post:Post) {
    if(!post.upvoted) {
      this.fireStoreService.upvoteProductRequest(post.id as string)
    }
  }
}
