import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Observable, from } from 'rxjs';
import {environmentTest} from "../../environments/testEnv/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private auth: any;
  constructor() {
    const app = initializeApp(environmentTest.firebase);
    this.auth = getAuth(app);
  }

  // Authentication methods
  register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): Observable<any> {
    return new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
    });
  }
}
