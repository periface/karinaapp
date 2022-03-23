import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceBase } from '../service.base';
import { InitialUserInfo, UserInfoModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService implements ServiceBase {
  /**
   *
   */

  collectionName = 'users';
  constructor(private afs: AngularFirestore) {}

  async saveUserData(uid: string, data: UserInfoModel) {
    await this.afs.collection('users').doc(uid).set(data, { merge: true }); // G G CILLO
  }
  getUserInfoByUId(userId: string) {
    return this.afs
      .collection<UserInfoModel>(this.collectionName)
      .doc(userId)
      .get()
      .toPromise();
  }
  getUsersByRoleName(role: string): Observable<UserInfoModel[]> {
    return this.afs
      .collection<UserInfoModel>(this.collectionName, (ref) =>
        ref.where('rol', '==', role)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return {
              id,
              ...data,
            };
          })
        )
      );
  }
  async createInitialUserInfo(
    userId: string,
    input: InitialUserInfo
  ): Promise<UserInfoModel> {
    await this.afs.collection(this.collectionName).doc(userId).set(input);
    const userRegisterInfo = (await this.getUserInfoByUId(userId)).data();
    return userRegisterInfo;
  }
}
