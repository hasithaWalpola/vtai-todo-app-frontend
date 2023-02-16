import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/reponse.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
  ) { }

  public login(data: any): Observable<ResponseModel> {
    return this.api.post(`login`, data);
  }

  public register(data: any): Observable<ResponseModel> {
    return this.api.post(`register`, data);
  }

  public getLoggedUser(): Observable<ResponseModel> {
    return this.api.get(`logged/user`);
  }

  public getAllUsers(): Observable<ResponseModel> {
    return this.api.get(`users`);
  }
}
