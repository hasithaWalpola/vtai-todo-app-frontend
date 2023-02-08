import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() {
  }

  public getUserToken(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  storeUserToken(userToken: any) {
    localStorage.setItem('currentUser', JSON.stringify(userToken));
  }

  storeLoggedUser(userData: any) {
    localStorage.setItem('loggedUser', JSON.stringify(userData));
  }

  public getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser')!);
  }

  removerUserData() {
    // remove user from local storage when user logout
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedUser');
  }
}
