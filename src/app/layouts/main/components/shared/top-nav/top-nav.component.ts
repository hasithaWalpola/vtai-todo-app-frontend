import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  loggedUser: any;
  language: string = '';

  constructor(
    private authService: AuthService,
    private data: DataService
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getLoggedUser();

    this.data.currentLanguage.subscribe(language => this.language = language)

    console.log(this.language, 'this.language ');

  }

  logout() {
    this.authService.removerUserData();
    window.location.href = '/login';
  }

  translate() {
    this.data.changeLanguage("German")
  }
}
