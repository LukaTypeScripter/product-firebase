import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import {Observable, from, Subject, BehaviorSubject} from 'rxjs';
import {environmentTest} from "../../environments/testEnv/environment";
import {doc, Firestore, increment, orderBy, updateDoc} from "@angular/fire/firestore";
import {Post, PostType} from "../models/post.interface";
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  categoryType = new BehaviorSubject('all')
  sortOption = new BehaviorSubject('Most Upvotes')
  constructor(private readonly firestore: Firestore) {
  }

  async addProductRequest(request: Post): Promise<Post> {
    const productRequestsCollection = collection(this.firestore, 'productRequests');
    return addDoc(productRequestsCollection, request).then(docRef => {
      return { ...request, id: docRef.id } as Post;
    });
  }

  getProductRequests(category?: string, sortOption?: string): Observable<Post[]> {
    let productRequestsCollection = collection(this.firestore, 'productRequests');
    let productRequestsQuery: any;
    if (category && category.toLowerCase() !== "all") {
      productRequestsQuery = query(productRequestsCollection, where('status', '==', category.toLowerCase()));
    } else {
      productRequestsQuery = productRequestsCollection;
    }

    switch (sortOption) {
      case 'Most Upvotes':
        productRequestsQuery = query(productRequestsQuery, orderBy('upvotes', 'desc'));
        break;
      case 'Least Upvotes':
        productRequestsQuery = query(productRequestsQuery, orderBy('upvotes', 'asc'));
        break;
      case 'Most Comments':
        productRequestsQuery = query(productRequestsQuery, orderBy('commentsCount', 'desc'));
        break;
      case 'Least Comments':
        productRequestsQuery = query(productRequestsQuery, orderBy('commentsCount', 'asc'));
        break;
      default:
        break;
    }

    return from(getDocs(productRequestsQuery).then(querySnapshot => {
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Post)
      } as Post));
    }));
  }



  addComment(productRequestId: string, comment: any): Promise<any> {
    const commentsCollection = collection(this.firestore, `productRequests/${productRequestId}/comments`);
    return addDoc(commentsCollection, comment);
  }

  getComments(productRequestId: string): Observable<any[]> {
    const commentsCollection = collection(this.firestore, `productRequests/${productRequestId}/comments`);
    return from(getDocs(commentsCollection).then(querySnapshot => {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }));
  }

  addReply(productRequestId: string, commentId: string, reply: any): Promise<any> {
    const repliesCollection = collection(this.firestore, `productRequests/${productRequestId}/comments/${commentId}/replies`);
    return addDoc(repliesCollection, reply);
  }

  getReplies(productRequestId: string, commentId: string): Observable<any[]> {
    const repliesCollection = collection(this.firestore, `productRequests/${productRequestId}/comments/${commentId}/replies`);
    return from(getDocs(repliesCollection).then(querySnapshot => {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }));
  }

  // Upvote methods
  async upvoteProductRequest(productRequestId: string,post:Post): Promise<void> {
    try {
      const productRequestDoc = doc(this.firestore, 'productRequests', productRequestId);
      if(post.upvoted) {
        await updateDoc(productRequestDoc, { upvotes: increment(-1),upvoted: false });
      } else {
        await updateDoc(productRequestDoc, { upvotes: increment(1),upvoted: true });
      }
      console.log(`Successfully upvoted product request with ID: ${productRequestId}`);
    } catch (error) {
      console.error(`Error upvoting product request with ID: ${productRequestId}`, error);
      throw error;
    }
  }

  async upvoteComment(productRequestId: string, commentId: string): Promise<void> {
    const commentDoc = doc(this.firestore, `productRequests/${productRequestId}/comments`, commentId);
    await updateDoc(commentDoc, { upvotes: increment(1) });
  }

  async upvoteReply(productRequestId: string, commentId: string, replyId: string): Promise<void> {
    const replyDoc = doc(this.firestore, `productRequests/${productRequestId}/comments/${commentId}/replies`, replyId);
    await updateDoc(replyDoc, { upvotes: increment(1) });
  }
}
