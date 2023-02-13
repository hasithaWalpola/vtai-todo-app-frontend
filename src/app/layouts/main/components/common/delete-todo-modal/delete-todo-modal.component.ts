import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/shared/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { AddEditTodoModalComponent } from '../add-edit-todo-modal/add-edit-todo-modal.component';

@Component({
  selector: 'app-delete-todo-modal',
  templateUrl: './delete-todo-modal.component.html',
  styleUrls: ['./delete-todo-modal.component.scss']
})
export class DeleteTodoModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEditTodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService,
  ) { }


  deleteTodo() {

    this.todoService.delete(this.data.id)
      .then((res) => {
        console.log(res, 'delete');
        this.dialogRef.close(true);
      }).catch((error) => {
        console.log(error, 'Error');
      });

  }

  cancel() {
    this.dialogRef.close();
  }

}
