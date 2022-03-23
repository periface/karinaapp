import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppInjector } from '../core/app-injector';
import { LocalStorageLocations } from '../services/localstorage/localstorage.constants';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import { BreadCrumb } from './breadcrumbs/breadcrumbs.model';
@Component({
  template: '',
})
export class BaseComponent {
  /**
   *
   */
  /**
   *
   */

  public config = {};
  public roles = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ADMIN: 'ADMINISTRADOR',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CONFERENCISTA: 'CONFERENCISTA',
  };
  http: HttpClient;
  public breadCrumbs: BreadCrumb[] = [];
  protected localStorageService: LocalstorageService;
  protected snackBar: MatSnackBar;
  constructor() {
    this.localStorageService = AppInjector.injector.get(LocalstorageService);
    this.http = AppInjector.injector.get(HttpClient);
    this.snackBar = AppInjector.injector.get(MatSnackBar);
    const config = this.localStorageService.getItem(
      LocalStorageLocations.APP_CONFIG
    );
    if (config) {
      this.config = JSON.parse(config);
    }
  }
  public waitFor = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Comprueba si el usuario actual tiene determinado rol
   *
   * @param role
   * @param userId
   * @returns boolean
   */
  public hasRole(role: string) {
    try {
      const user = this.localStorageService.userData;
      if (user) {
        if (user.rol === role) {
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  async showMessage(
    message: string,
    actionButton?: string,
    actionFunction?: any,
    options?: any
  ) {
    try {
      const ref = this.snackBar.open(message, actionButton, options);
      ref.onAction().subscribe(actionFunction);
    } catch (error) {}
  }

  //Construye el objeto de conferencia para usarse en la UI

  datesAreOnSameDay(first: Date, second: Date) {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }
  /**
   * @description
   * Takes an Array<V>, and a grouping function,
   * and returns a Map of the array grouped by the grouping function.
   *
   * @param list An array of type V.
   * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
   *                  K is generally intended to be a property key of V.
   *
   * @returns Map of the array grouped by the grouping function.
   */
  //export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
  //    const map = new Map<K, Array<V>>();
  groupBy(list: Array<any>, keyGetter: any) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  public handleDate(date: any) {
    try {
      return date.toMillis();
    } catch (error) {
      return date;
    }
  }
  public async getIPAddress() {
    try {
      const ipLocal = this.localStorageService.getItem(
        LocalStorageLocations.IP_ADDRESS
      );
      if (ipLocal) {
        return JSON.parse(ipLocal);
      }
      const ip = await this.http
        .get('http://api.ipify.org/?format=json')
        .toPromise();
      return ip;
    } catch (error) {
      return {
        ip: 'NOT_FOUND',
      };
    }
  }
  private default(value: any, fallbackValue: any) {
    if (!value) {
      return fallbackValue;
    }
    return value;
  }
}
