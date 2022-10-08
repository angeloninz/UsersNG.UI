import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UsersNG.UI';

  /**
   *
   */
  constructor(public authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }
}
