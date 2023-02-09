import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() task: any;
  @Output() editTask = new EventEmitter();
  @Output() deleteTask = new EventEmitter();

  ngOnInit(): void {
    console.log(this.task, 'task');
  }

  onEdit() {
    this.editTask.emit()
  }

  onDelete() {
    this.deleteTask.emit()
  }
}
