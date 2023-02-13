import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { todoReducers } from './todo.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
    todos: todoReducers,
};