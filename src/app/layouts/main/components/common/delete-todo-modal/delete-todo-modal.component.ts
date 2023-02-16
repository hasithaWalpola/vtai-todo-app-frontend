import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo/todo.service';
import { AddEditTodoModalComponent } from '../add-edit-todo-modal/add-edit-todo-modal.component';

@Component({
  selector: 'app-delete-todo-modal',
  templateUrl: './delete-todo-modal.component.html',
  styleUrls: ['./delete-todo-modal.component.scss']
})
export class DeleteTodoModalComponent {

  error = "";

  constructor(
    public dialogRef: MatDialogRef<AddEditTodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private todoService: TodoService,
  ) { }


  deleteTodo() {

    this.todoService.delete(this.todo.id)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => this.error = error.error
      });

  }

  cancel() {
    this.dialogRef.close();
  }

}
