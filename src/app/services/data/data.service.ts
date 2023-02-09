import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private defaultLanguage = new BehaviorSubject('English');
  currentLanguage = this.defaultLanguage.asObservable();

  constructor() { }

  changeLanguage(language: string) {
    this.defaultLanguage.next(language)
  }

}