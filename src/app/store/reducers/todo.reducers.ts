import { ETodoActions } from './../actions/todo.actions';
import { TodoActions } from '../actions/todo.actions';
import { initialTodoState, TodoState } from '../state/todo.state';

export const todoReducers = (
    state = initialTodoState,
    action: TodoActions
): TodoState => {
    switch (action.type) {

        case ETodoActions.GET_TODOS_SUCCESS: {
            return {
                ...state,
                todos: action.payload
            };

        }

        case ETodoActions.UPDATE_TODOS_SUCCESS: {
            return {
                ...state,
                todos: action.payload
            };

        }

        default:
            return state;
    }
};