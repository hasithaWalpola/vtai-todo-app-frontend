import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Language } from 'src/app/models/language.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  loggedUser!: User;
  language: string = '';
  languages: Language[] = [
    { 'lang': 'English', 'value': 'en' },
    { 'lang': 'German', 'value': 'de' },
    { 'lang': 'Spanish', 'value': 'es' }
  ];

  constructor(
    private authService: AuthService,
    private data: DataService
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getLoggedUser();

    this.data.currentLanguage.subscribe(language => this.language = language.lang);
  }

  logout() {
    this.authService.removerUserData();
    this.authService.removerUserData();
    window.location.href = '/login';
  }

  /* update the language oberservable */
  translate(language: Language) {
    this.data.changeLanguage(language)
  }

}
