import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/shared/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { AddEditTodoModalComponent } from '../common/add-edit-todo-modal/add-edit-todo-modal.component';
import { DeleteTodoModalComponent } from '../common/delete-todo-modal/delete-todo-modal.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  public todoList: any = []
  public loggedUser: any = {}

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getLoggedUser()

    if (this.loggedUser) {
      this.getTodoList();
    }

  }

  getTodoList() {

    this.todoService.getTodosByUser(this.loggedUser.id).then((res) => {

      console.log(res, 'getTodosByUser');
      this.todoList = res.data;

    })

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
}
