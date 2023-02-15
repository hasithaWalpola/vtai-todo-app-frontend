import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
  ) { }

  public login(data: User) {
    return firstValueFrom(this.api.post(`login`, data));
  }

  public register(data: User) {
    return firstValueFrom(this.api.post(`register`, data));
  }

  public getLoggedUser() {
    return firstValueFrom(this.api.get(`logged/user`));
  }

  public getAllUsers() {
    return firstValueFrom(this.api.get(`users`));
  }
}
