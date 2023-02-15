import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { ApiService } from '../shared/api.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoService: TodoService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['post', 'put', 'delete', 'get']);
    TestBed.configureTestingModule({
      providers: [TodoService, { provide: ApiService, useValue: spy }]
    });
    todoService = TestBed.inject(TodoService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  describe('create', () => {
    it('should create a todo', () => {
      const todo: any = {
        title: 'Test',
        description: 'description',
        user_id: 1,
      };
      apiServiceSpy.post.and.returnValue(of(todo));

      todoService.create(todo).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(apiServiceSpy.post.calls.count()).toBe(1);
    });
  });

  describe('update', () => {
    it('should update a todo', () => {
      const todo: any = {
        id: 1,
        title: 'Test',
        description: 'description',
        user_id: 1,
      };
      apiServiceSpy.put.and.returnValue(of(todo));

      todoService.update(1, todo).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(apiServiceSpy.put.calls.count()).toBe(1);
    });
  });

  describe('delete', () => {
    it('should delete a todo', () => {
      const todo: any = {
        id: 1,
        title: 'Test',
        description: 'description',
        user_id: 1,
      };
      apiServiceSpy.delete.and.returnValue(of(todo));

      todoService.delete(todo.id).subscribe(result => {
        expect(result).toEqual(todo);
      });
      expect(apiServiceSpy.delete.calls.count()).toBe(1);
    });
  });

  // describe('getTodosByUser', () => {
  //   it('should get todos by user', () => {
  //     const todos: Todo [] = [
  //       {
  //         id: 1,
  //         title: 'Test',
  //         description: 'description',
  //         user_id: 1,
  //         status : 'TODO',
  //         createdAt : '11/02/2020',
  //         translation: {en : 'Test'}
  //       },
  //       {
  //         id: 2,
  //         title: 'Test',
  //         description: 'description',
  //         user_id: 1,
  //         status : 'TODO',
  //         createdAt : '11/02/2020',
  //         translation: {en : 'Test'}
  //       }
  //     ];
  //     apiServiceSpy.get.and.returnValue(of(todos));

  //     todoService.getTodosByUser(1).subscribe(result => {
  //       expect(result).toEqual(todos);
  //     });
  //     expect(apiServiceSpy.get.calls.count()).toBe(1);
  //   });
  // });

});
