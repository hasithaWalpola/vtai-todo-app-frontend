import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { AddEditTodoModalComponent } from './components/common/add-edit-todo-modal/add-edit-todo-modal.component';
import { DeleteTodoModalComponent } from './components/common/delete-todo-modal/delete-todo-modal.component';
import { TodoComponent } from './components/todo/todo.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { TodoItemComponent } from './components/common/todo-item/todo-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodoComponent,
    UserComponent,
    TodoItemComponent,
    AddEditTodoModalComponent,
    DeleteTodoModalComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule { }
