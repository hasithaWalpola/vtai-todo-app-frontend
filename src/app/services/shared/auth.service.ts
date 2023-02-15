import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public getUserToken(): UserToken {
    return JSON.parse(localStorage.getItem('userToken') || '{}');
  }

  storeUserToken(userToken: UserToken) {
    localStorage.setItem('userToken', JSON.stringify(userToken));
    const user = this.jwtHelper.decodeToken(userToken.token)
    this.storeLoggedUser(user);

  }

  storeLoggedUser(userData: User) {
    localStorage.setItem('loggedUser', JSON.stringify(userData));

  }

  public getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('loggedUser') || '{}');
  }

  removerUserData() {
    // remove user from local storage when user logout
    localStorage.removeItem('userToken');
    localStorage.removeItem('loggedUser');
  }
}
