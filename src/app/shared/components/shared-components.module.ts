import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { BreadCrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { InscribirseButtonComponent } from './inscribirse-button/inscribirse-button.component';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  declarations: [
    InscribirseButtonComponent,
    ConfirmComponent,
    BreadCrumbsComponent,
  ],
  exports: [InscribirseButtonComponent, BreadCrumbsComponent, ConfirmComponent],
})
export class SharedComponentsModule {}
