import { UserInfoModel } from './../shared/services/user-service/user.model';
import { BaseComponent } from 'src/app/shared/components/base-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page extends BaseComponent implements OnInit {
  user: UserInfoModel;
  constructor() {
    super();
    this.user = this.localStorageService.userData;
  }
  ngOnInit(): void {
    console.log(this.user);
  }
}
