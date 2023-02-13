import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/shared/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-add-edit-todo-modal',
  templateUrl: './add-edit-todo-modal.component.html',
  styleUrls: ['./add-edit-todo-modal.component.scss']
})
export class AddEditTodoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditTodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    console.log("AddEditTodoModalComponent", this.data);
    this.form.patchValue(this.data);

  }

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('',),
  });

  save(method: any) {

    console.log(this.form.value, 'this.form.value');

    if (this.form.valid) {

      if (method == 'Add') {
        this.addTodo();
      } else {
        this.editTodo();
      }

    } else {
      console.log('Form not filled');
    }
  }

  addTodo() {

    this.todoService.create({
      title: this.form.value.title,
      description: this.form.value.description,
      user_id: this.authService.getLoggedUser().id
    }).then((res) => {
      console.log(res, 'create');
      this.dialogRef.close(true);
    }).catch((error) => {
      console.log(error, 'Error');
    });

  }

  editTodo() {

    this.todoService.update(this.data.id, {
      title: this.form.value.title,
      description: this.form.value.description,
      user_id: this.authService.getLoggedUser().id
    }).then((res) => {
      console.log(res, 'update');
      this.dialogRef.close(true);
    }).catch((error) => {
      console.log(error, 'Error');
    });

  }

  cancel() {
    this.dialogRef.close();
  }

}
