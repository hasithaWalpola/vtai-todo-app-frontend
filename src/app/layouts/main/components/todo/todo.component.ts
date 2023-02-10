import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
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
export class TodoComponent {

  todos$ = this.store.pipe(select(selectTodoList))
  public loggedUser: any = {}
  public todoList: any = []
  currentLanguage: string = '';

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

    this.store.subscribe((res) => {
      console.log('store', res);
      if (res.todos.todos) {
        this.todoList = res.todos.todos
      }
    })

    this.data.currentLanguage.subscribe(language => {
      this.currentLanguage = language.value;
      this.translateTodoList(language)
    })

  }

  getTodoList() {

    this.store.dispatch(new GetTodos(this.loggedUser.id));
    //this.translateTodoList(this.currentLanguage)

  }


  addTask() {
    const dialogRef = this.dialog.open(AddEditTodoModalComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.getTodoList();
      }
    });
  }


  editTask(task: any) {

    const dialogRef = this.dialog.open(AddEditTodoModalComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getTodoList();
      }
    });

  }

  deleteTask(task: any) {

    const dialogRef = this.dialog.open(DeleteTodoModalComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getTodoList();
      }
    });

  }

  translateTodoList(language: any) {

    console.log(language, 'translateTodoList', this.todoList);
    let todoList: any = []
    this.todoList.forEach((element: any) => {
      if (!element.translation || !element.translation[language.value]) {
        todoList.push(element.title)
      }
    });

    this.saveTranslationAction(language)

    console.log(todoList, 'todoList');

    if (todoList.length > 0) {
      let obj = {
        q: todoList,
        target: language.value
      }

      this.translationService.translate(obj)
        .then((res: any) => {

          let translatedTodoList: any = []
          this.todoList.forEach((todo: any, index: any) => {
            let obj: any = { ...todo }

            if ((typeof obj.translation === "object" || typeof obj.translation === 'function') && (obj.translation !== null)) {
              obj.translation = { ...obj.translation }
              obj.translation[language?.value] = res.data.translations[index].translatedText;
            }

            translatedTodoList.push(obj);

          });

          console.log(translatedTodoList, 'translationService');
          this.store.dispatch(new UpdateTodosSuccess(translatedTodoList));

        }).catch((error) => {
          console.log(error, 'Error');
        });

    }


  }


  saveTranslationAction(language: any) {

    this.translationService.saveAction({
      language: language.lang,
      user_id: this.authService.getLoggedUser().id
    }).then((res) => {
      console.log(res, 'save action');
    }).catch((error) => {
      console.log(error, 'Error');
    });

  }


}
