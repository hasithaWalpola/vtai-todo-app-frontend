import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = { id: 1, title: 'Test Todo' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editTask when onEdit is called', () => {
    spyOn(component.editTask, 'emit');
    component.onEdit();
    expect(component.editTask.emit).toHaveBeenCalled();
  });

  it('should emit deleteTask when onDelete is called', () => {
    spyOn(component.deleteTask, 'emit');
    component.onDelete();
    expect(component.deleteTask.emit).toHaveBeenCalled();
  });
});
