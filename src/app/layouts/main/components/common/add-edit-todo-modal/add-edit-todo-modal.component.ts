import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo.model';
import { AuthService } from 'src/app/services/shared/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-add-edit-todo-modal',
  templateUrl: './add-edit-todo-modal.component.html',
  styleUrls: ['./add-edit-todo-modal.component.scss']
})
export class AddEditTodoModalComponent implements OnInit {

  error = "";

  constructor(
    public dialogRef: MatDialogRef<AddEditTodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private todoService: TodoService,
    private authService: AuthService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {

    this.form.patchValue(this.todo);

  }

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('',),
  });

  save(method: string) {

    if (this.form.valid) {

      if (method == 'Add') {
        this.addTodo();
      } else {
        this.editTodo();
      }
    }
  }

  addTodo() {

    const todo = new Todo()
    todo.title = this.form.value.title;
    todo.description = this.form.value.description;
    todo.user_id = this.authService.getLoggedUser().id;

    this.todoService.create(todo)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => this.error = error.error
      });

  }

  editTodo() {

    const todo = new Todo()
    todo.title = this.form.value.title;
    todo.description = this.form.value.description;
    todo.user_id = this.authService.getLoggedUser().id;

    this.todoService.update(this.todo.id, todo)
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
