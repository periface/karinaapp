import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../shared/components/base-component.component';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page extends BaseComponent {
  constructor(private authService: AuthService, private router: Router) {
    super();
  }
  async logOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
