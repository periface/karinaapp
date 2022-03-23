import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmailPasswordModel, ExternalOptionInput } from './auth.model';

import * as firebase from 'firebase/compat/app';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { LocalStorageLocations } from '../localstorage/localstorage.constants';
import { UserService } from '../user-service/user.service';
import { UserInfoModel } from '../user-service/user.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   *
   */
  constructor(
    private auth: AngularFireAuth,
    afs: AngularFirestore,
    private localStorageService: LocalstorageService,
    private userService: UserService
  ) {}

  async emailPasswordLogin(input: EmailPasswordModel) {
    try {
      const userCredentials = await this.auth.signInWithEmailAndPassword(
        input.email,
        input.password
      );

      if (userCredentials.user) {
        this.localStorageService.setItem(
          LocalStorageLocations.USER_ID,
          userCredentials.user.uid
        );
        const userRegisterInfo = await this.userService.getUserInfoByUId(
          userCredentials.user.uid
        );

        const data = userRegisterInfo.data() as UserInfoModel;
        this.localStorageService.setItem(
          LocalStorageLocations.USER_SURVEY_FINISHED,
          JSON.stringify(data.registroFinalizado)
        );
        this.localStorageService.setItem(
          LocalStorageLocations.USER_ACCOUNT_INFO,
          JSON.stringify(userRegisterInfo.data())
        );
        return data;
      } else {
        throw new Error('Usuario/contraseña incorrectos');
      }
    } catch (error) {
      throw new Error('Usuario/contraseña incorrectos');
    }
  }
  async createEmailPasswordAccount(input: EmailPasswordModel) {
    try {
      const userCredentials = await this.auth.createUserWithEmailAndPassword(
        input.email,
        input.password
      );
      if (userCredentials.user) {
        await this.userService.createInitialUserInfo(
          userCredentials.user?.uid,
          {
            email: input.email,
            nombreCompleto: input.nombreCompleto || '',
            registerDate: input.registerDate || new Date(Date.now()),
            registerIp: input.registerIp,
          }
        );
        this.localStorageService.setItem(
          LocalStorageLocations.USER_ID,
          userCredentials.user.uid
        );
        this.localStorageService.setItem(
          LocalStorageLocations.USER_ACCOUNT_INFO,
          JSON.stringify({
            email: input.email,
            nombreCompleto: input.nombreCompleto,
          })
        );
        return userCredentials;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Error creando usuario');
    }
  }
  sendPasswordRecoveryMail(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
  async signInWith(externalOptionInput: ExternalOptionInput) {
    try {
      const external =
        externalOptionInput.external === 'facebook'
          ? new firebase.default.auth.FacebookAuthProvider()
          : new firebase.default.auth.GoogleAuthProvider();

      const userCredentials = await this.auth.signInWithPopup(external);

      if (userCredentials && userCredentials.user) {
        let userRegisterInfo = (
          await this.userService.getUserInfoByUId(userCredentials.user.uid)
        ).data();

        if (!userRegisterInfo) {
          userRegisterInfo = await this.userService.createInitialUserInfo(
            userCredentials.user?.uid,
            {
              email: userCredentials.user.email
                ? userCredentials.user.email
                : '',
              nombreCompleto: userCredentials.user.displayName
                ? userCredentials.user.displayName
                : '',
              registerDate: new Date(Date.now()),
              registerIp: externalOptionInput.ip,
            }
          );
          return userRegisterInfo;
        } else {
          this.localStorageService.setItem(
            LocalStorageLocations.USER_SURVEY_FINISHED,
            JSON.stringify(userRegisterInfo.registroFinalizado)
          );
          this.localStorageService.setItem(
            LocalStorageLocations.USER_ACCOUNT_INFO,
            JSON.stringify(userRegisterInfo)
          );
        }
        this.localStorageService.setItem(
          LocalStorageLocations.USER_ID,
          userCredentials.user.uid
        );
        this.localStorageService.setItem(
          LocalStorageLocations.USER_ACCOUNT_INFO,
          JSON.stringify({
            email: userCredentials.user?.email,
            nombreCompleto: userCredentials.user?.displayName,
          })
        );
        return userRegisterInfo;
      }
      return null;
    } catch (error) {
      throw new Error('Error iniciando sesión con proveedor externo');
    }
  }
  async signOut() {
    await this.auth.signOut();
    this.localStorageService.clear();
  }
}
