import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRegistrationPage } from './app-registration.page';

const routes: Routes = [
  {
    path: '',
    component: AppRegistrationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRegistrationRoutingModule {}
