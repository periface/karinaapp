import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressionService {
  /**
   *
   */
  constructor(private afs: AngularFirestore) {}

  addProgressionUpdate() {}
}
