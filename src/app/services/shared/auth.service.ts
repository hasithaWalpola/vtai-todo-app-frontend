import { Injectable } from '@angular/core';
import { UserToken } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public getUserToken(): UserToken {
    return JSON.parse(localStorage.getItem('userToken')!);
  }

  storeUserToken(userToken: UserToken) {
    localStorage.setItem('userToken', JSON.stringify(userToken));
  }

  storeLoggedUser(userData: User) {
    localStorage.setItem('loggedUser', JSON.stringify(userData));
  }

  public getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser') || '');
  }

  removerUserData() {
    // remove user from local storage when user logout
    localStorage.removeItem('userToken');
    localStorage.removeItem('loggedUser');
  }
}
