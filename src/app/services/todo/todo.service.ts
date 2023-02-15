import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  getLoggedUser: any;

  constructor(
    private api: ApiService,
  ) { }

  public create(data: Todo): Observable<any> {
    return this.api.post(`todo`, data);
  }

  public update(id: number, data: Todo): Observable<any> {
    return this.api.put(`todo/${id}`, data);
  }

  public delete(id: number): Observable<any> {
    return this.api.delete(`todo/${id}`);
  }

  public getTodosByUser(user_id: number): Observable<Todo> {
    return this.api.get(`todo/user/${user_id}`);
  }

}
