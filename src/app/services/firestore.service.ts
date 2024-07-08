import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import {environmentTest} from "../../environments/testEnv/environment";
import {doc, Firestore, increment, updateDoc} from "@angular/fire/firestore";
import {Post, PostType} from "../models/post.interface";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private readonly firestore: Firestore;

  constructor() {
    const app = initializeApp(environmentTest.firebase);
    this.firestore = getFirestore(app);
  }

  async addProductRequest(request: Post): Promise<Post> {
    const productRequestsCollection = collection(this.firestore, 'productRequests');
    return addDoc(productRequestsCollection, request).then(docRef => {
      return { ...request, id: docRef.id } as Post;
    });
  }

  getProductRequests(): Observable<Post[]> {
    const productRequestsCollection = collection(this.firestore, 'productRequests');
    return from(getDocs(productRequestsCollection).then(querySnapshot => {
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
  async upvoteProductRequest(productRequestId: string): Promise<void> {
    const productRequestDoc = doc(this.firestore, 'productRequests', productRequestId);
    await updateDoc(productRequestDoc, { upvotes: increment(1) });
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
