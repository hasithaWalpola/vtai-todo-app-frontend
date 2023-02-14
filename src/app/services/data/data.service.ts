import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from 'src/app/models/language.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private defaultLanguage = new BehaviorSubject({ 'lang': 'English', 'value': 'en' });
  currentLanguage = this.defaultLanguage.asObservable();
  selectedUser!: User;

  constructor() { }

  changeLanguage(language: Language) {
    this.defaultLanguage.next(language)
  }

  setSelectedUser(user: User) {
    this.selectedUser = user
  }

  getSelectedUser() {
    return this.selectedUser;
  }

}