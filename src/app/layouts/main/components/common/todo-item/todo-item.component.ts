import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() todo: any;
  @Input() language: any;
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
