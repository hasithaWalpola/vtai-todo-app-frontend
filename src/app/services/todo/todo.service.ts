import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private api: ApiService,
  ) { }

  public create(data: Todo) {
    return firstValueFrom(this.api.post(`todo`, data));
  }

  public update(id: number, data: Todo) {
    return firstValueFrom(this.api.put(`todo/${id}`, data));
  }

  public delete(id: number) {
    return firstValueFrom(this.api.delete(`todo/${id}`));
  }

  public getTodosByUser(user_id: number) {
    return firstValueFrom(this.api.get(`todo/user/${user_id}`));
  }


}
