import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private api: ApiService,
  ) { }

  public create(data: any) {
    return firstValueFrom(this.api.post(`todo`, data));
  }

  public update(id: any, data: any) {
    return firstValueFrom(this.api.put(`todo/${id}`, data));
  }

  public delete(id: any) {
    return firstValueFrom(this.api.delete(`todo/${id}`));
  }

  public getTodosByUser(user_id: any) {
    return firstValueFrom(this.api.get(`todo/user/${user_id}`));
  }
}
