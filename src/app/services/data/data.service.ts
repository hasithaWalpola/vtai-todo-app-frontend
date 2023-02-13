import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private defaultLanguage = new BehaviorSubject({ 'lang': 'English', 'value': 'en' },);
  currentLanguage = this.defaultLanguage.asObservable();
  selectedUser: any;

  constructor() { }

  changeLanguage(language: any) {
    this.defaultLanguage.next(language)
  }

  setSelectedUser(user: any) {
    this.selectedUser = user
  }

  getSelectedUser() {
    return this.selectedUser;
  }

}