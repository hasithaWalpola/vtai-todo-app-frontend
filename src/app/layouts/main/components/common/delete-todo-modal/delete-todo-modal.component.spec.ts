import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo/todo.service';
import { DeleteTodoModalComponent } from './delete-todo-modal.component';

describe('DeleteTodoModalComponent', () => {
  let component: DeleteTodoModalComponent;
  let fixture: ComponentFixture<DeleteTodoModalComponent>;
  let dialogRef: MatDialogRef<DeleteTodoModalComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const dialogMock = {
      close: jasmine.createSpy('close'),
    };

    const todoServiceMock = jasmine.createSpyObj('TodoService', ['delete']);

    await TestBed.configureTestingModule({
      declarations: [DeleteTodoModalComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TodoService, useValue: todoServiceMock },
      ],
    }).compileComponents();

    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTodoModalComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should deleteTodo and close the dialog on success', () => {
    todoService.delete.and.returnValue(of({}));

    component.todo = new Todo();
    component.todo.id = 1;

    component.deleteTodo();

    expect(todoService.delete).toHaveBeenCalledWith(1);
    expect(dialogRef.close).toHaveBeenCalledWith(true);
    expect(component.error).toBe('');
  });

  it('should set the error message on error', () => {
    const errorMessage = 'Error deleting todo.';
    todoService.delete.and.returnValue(
      new Observable((observer) => {
        observer.error({ error: errorMessage });
      })
    );

    component.todo = new Todo();
    component.todo.id = 1;

    component.deleteTodo();

    expect(todoService.delete).toHaveBeenCalledWith(1);
    expect(dialogRef.close).not.toHaveBeenCalled();
    expect(component.error).toBe(errorMessage);
  });



  it('should close the dialog', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });

});
