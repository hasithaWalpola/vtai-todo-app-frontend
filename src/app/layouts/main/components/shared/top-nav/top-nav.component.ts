import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  loggedUser: any;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getLoggedUser();
  }

  logout() {
    this.authService.removerUserData();
    window.location.href = '/login';
  }

  translate() {

  }
}
