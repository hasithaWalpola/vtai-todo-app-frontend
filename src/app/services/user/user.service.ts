import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
  ) { }

  public login(data: any) {
    return firstValueFrom(this.api.post(`login`, data));
  }

  public register(data: any) {
    return firstValueFrom(this.api.post(`register`, data));
  }

  public getLoggedUser() {
    return firstValueFrom(this.api.get(`logged/user`));
  }

  public getAllUsers() {
    return firstValueFrom(this.api.get(`users`));
  }
}
