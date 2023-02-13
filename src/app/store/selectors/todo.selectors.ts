import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { TodoState } from '../state/todo.state';

const selectTodos = (state: AppState) => state.todos;

export const selectTodoList = createSelector(
    selectTodos,
    (state: TodoState) => state.todos
);
