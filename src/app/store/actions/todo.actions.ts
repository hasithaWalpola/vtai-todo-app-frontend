import { Action } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export enum ETodoActions {
    GET_TODOS = '[Todo] Get Todos',
    GET_TODOS_SUCCESS = '[Todo] Get Todo Success',

    UPDATE_TODOS = '[Todo] Update Todos',
    UPDATE_TODOS_SUCCESS = '[Todo] Update Todo Success',
}

export class GetTodos implements Action {
    constructor(public user_id: number) { }
    public readonly type = ETodoActions.GET_TODOS;
}

export class GetTodosSuccess implements Action {
    public readonly type = ETodoActions.GET_TODOS_SUCCESS;
    constructor(public payload: Todo[]) { }
}

export class UpdateTodos implements Action {
    constructor(public user_id: number) { }
    public readonly type = ETodoActions.UPDATE_TODOS;
}

export class UpdateTodosSuccess implements Action {
    public readonly type = ETodoActions.UPDATE_TODOS_SUCCESS;
    constructor(public payload: Todo[]) { }
}


export type TodoActions = GetTodos | GetTodosSuccess | UpdateTodos | UpdateTodosSuccess;