import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() todo!: Todo;
  @Input() language!: string;
  @Output() editTask = new EventEmitter();
  @Output() deleteTask = new EventEmitter();
  title = ''



  onEdit() {
    this.editTask.emit()
  }

  onDelete() {
    this.deleteTask.emit()
  }

}
