import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() todo: any;
  @Input() language: any;
  @Output() editTask = new EventEmitter();
  @Output() deleteTask = new EventEmitter();
  title: string = ''

  constructor(
  ) { }


  ngOnInit(): void { }

  onEdit() {
    this.editTask.emit()
  }

  onDelete() {
    this.deleteTask.emit()
  }

}
