import {Component, inject, OnInit} from '@angular/core';
import {FirestoreService} from "../../../services/firestore.service";
import {combineLatest, Observable, switchMap, tap} from "rxjs";
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
    this.posts$ = combineLatest([
      this.fireStoreService.categoryType,
      this.fireStoreService.sortOption
    ]).pipe(
      switchMap(([category, option]) =>
        {
         return  this.fireStoreService.getProductRequests(category, option).pipe(
            tap(posts => console.log(posts))
          )
        }
      )
    );
  }
  upvote(post:Post) {
      this.fireStoreService.upvoteProductRequest(post.id as string,post).then(() => {
        this.fireStoreService.categoryType.next('all')
      })
  }

}
