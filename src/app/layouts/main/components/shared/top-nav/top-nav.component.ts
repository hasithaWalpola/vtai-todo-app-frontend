import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  languages: any[] = [
    { 'lang': 'English', 'value': 'en' },
    { 'lang': 'German', 'value': 'de' },
    { 'lang': 'Spanish', 'value': 'es' }
  ];
  toppings = new FormControl('');

  constructor(
    private authService: AuthService,
    private data: DataService
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getLoggedUser();

    this.data.currentLanguage.subscribe(language => this.language = language.lang)

    console.log(this.language, 'this.language ');

  }

  logout() {
    this.authService.removerUserData();
    window.location.href = '/login';
  }

  translate() {
    this.data.changeLanguage("German")
  }

  translate2(value: any) {
    console.log(value, 'translate2');
    this.data.changeLanguage(value)

  }
}
