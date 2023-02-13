import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import {
    GetTodosSuccess, GetTodos, ETodoActions
} from '../actions/todo.actions';
import { TodoService } from '../../services/todo/todo.service';


@Injectable()
export class TodoEffects {

    constructor(
        private todoService: TodoService,
        private _actions$: Actions,
        private _store: Store<AppState>
    ) { }

    getTodos$ = createEffect(() =>
        this._actions$.pipe(
            ofType<GetTodos>(ETodoActions.GET_TODOS),
            switchMap((action) =>
                this.todoService.getTodosByUser(action.user_id)),
            switchMap((data: any) => of(new GetTodosSuccess(data.data)))
        )
    );

}