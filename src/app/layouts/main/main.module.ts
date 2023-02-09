import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { AddEditTodoModalComponent } from './components/common/add-edit-todo-modal/add-edit-todo-modal.component';
import { DeleteTodoModalComponent } from './components/common/delete-todo-modal/delete-todo-modal.component';
import { TodoComponent } from './components/todo/todo.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    TodoComponent,
    UserComponent,
    AddEditTodoModalComponent,
    DeleteTodoModalComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule
  ]
})
export class MainModule { }
