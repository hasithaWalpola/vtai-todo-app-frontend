import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { TranslationHistory } from 'src/app/models/history.model';
import { Language } from 'src/app/models/language.model';
import { Todo } from 'src/app/models/todo.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { GetTodos, UpdateTodosSuccess } from 'src/app/store/actions/todo.actions';
import { selectTodoList } from 'src/app/store/selectors/todo.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { AddEditTodoModalComponent } from '../common/add-edit-todo-modal/add-edit-todo-modal.component';
import { DeleteTodoModalComponent } from '../common/delete-todo-modal/delete-todo-modal.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos$ = this.store?.pipe(select(selectTodoList))
  loggedUser!: User
  todoList: Todo[] = []
  currentLanguage = '';
  todo = new Todo();

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private data: DataService,
    private translationService: TranslationService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getLoggedUser()

    if (this.loggedUser) {
      this.getTodoList();
    }

    //  subscribe to the todo store change 
    this.store?.subscribe((res) => {
      if (res.todos.todos) {
        this.todoList = res.todos.todos
      }
    })

    // subscribe to the language change 
    this.data.currentLanguage.subscribe(language => {
      this.currentLanguage = language.value;
      // call translate function if the language change 
      this.translateTodoList(language)
    })

  }

  // load todo list
  getTodoList() {

    this.store?.dispatch(new GetTodos(this.loggedUser?.id));

  }

  // add/edit todo modal open 
  addEditTodo(todo: Todo) {
    const dialogRef = this.dialog.open(AddEditTodoModalComponent, {
      data: todo,
    });

    dialogRef.afterClosed().subscribe(result => {
      // refresh todo list if todo added/updated
      if (result) {
        this.getTodoList();
      }
    });
  }

  // delete todo modal open 
  deleteTodo(task: Todo) {

    const dialogRef = this.dialog.open(DeleteTodoModalComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      // refresh todo list if todo deleted
      if (result) {
        this.getTodoList();
      }
    });

  }

  // delete todo modal open 
  translateTodoList(language: Language) {

    const todoList: string[] = [] //temp array for store todo items name
    this.todoList.forEach((element: Todo) => {
      // check if item already translated for selected langiage 
      if (!element.translation || !element.translation[language.value]) {
        todoList.push(element.title)
      }
    });

    // check if items available for translations */
    if (todoList.length > 0) {
      const obj = {
        q: todoList,
        target: language.value
      }

      this.translationService.translate(obj)
        .subscribe({
          next: (res) => {
            const translatedTodoList: Todo[] = []
            this.todoList.forEach((todo: Todo, index: number) => {
              const obj: Todo = { ...todo }

              //update transdlation object in todo item
              if ((typeof obj.translation === "object" || typeof obj.translation === 'function') && (obj.translation !== null)) {
                obj.translation = { ...obj.translation }
                obj.translation[language?.value] = res.data.translations[index].translatedText;
              }
              translatedTodoList.push(obj);

            });

            //call translation action history save function
            this.saveTranslationAction(language)

            //update the todo store
            this.store.dispatch(new UpdateTodosSuccess(translatedTodoList));
          },
          error: (e) => console.error(e)
        });

    }

  }

  //save translation action history in database
  saveTranslationAction(language: Language) {

    const translationHistory = new TranslationHistory()

    translationHistory.language = language.lang
    translationHistory.user_id = this.authService.getLoggedUser().id

    this.translationService.saveAction(translationHistory)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (e) => console.error(e)
      });

  }


}
