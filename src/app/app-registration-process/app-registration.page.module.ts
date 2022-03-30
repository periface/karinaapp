import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRegistrationPage } from './app-registration.page';
import { AppRegistrationRoutingModule } from './app-registration-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppRegistrationRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
    SwiperModule
  ],
  declarations: [AppRegistrationPage],
})
export class AppRegistrationPageModule {}
