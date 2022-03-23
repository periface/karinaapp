import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
@NgModule({
  declarations: [AuthComponent],
  imports: [
    IonicModule,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
})
export class AuthModule {}
