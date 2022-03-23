import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shared/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./app-registration-process/app-registration.page.module').then(
        (m) => m.AppRegistrationPageModule
      ),
  },
  {
    path: 'main-app',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
