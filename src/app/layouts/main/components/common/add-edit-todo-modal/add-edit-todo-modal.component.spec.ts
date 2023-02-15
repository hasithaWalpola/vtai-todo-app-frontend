import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { Todo } from 'src/app/models/todo.model';
import { AuthService } from 'src/app/services/shared/auth.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { AddEditTodoModalComponent } from './add-edit-todo-modal.component';

describe('AddEditTodoModalComponent', () => {
  let component: AddEditTodoModalComponent;
  let fixture: ComponentFixture<AddEditTodoModalComponent>;
  let mockDialogRef: MatDialogRef<AddEditTodoModalComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    todoService = jasmine.createSpyObj(['create', 'update']);
    authService = jasmine.createSpyObj(['getLoggedUser']);

    await TestBed.configureTestingModule({
      declarations: [AddEditTodoModalComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: new Todo() },
        { provide: TodoService, useValue: todoService },
        { provide: AuthService, useValue: authService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form with the todo data', () => {
    const todo = new Todo();
    todo.title = 'Test title';
    todo.description = 'Test description';
    component.todo = todo;

    component.ngOnInit();

    expect(component.form.value.title).toBe('Test title');
    expect(component.form.value.description).toBe('Test description');
  });

  it('should create a new todo when "Add" button is clicked', () => {
    const todo = new Todo();
    todo.title = 'Test title';
    todo.description = 'Test description';
    todo.user_id = 1;
    component.form.patchValue(todo);
    const response = { success: true };
    authService.getLoggedUser.and.returnValue({
      id: 1,
      first_name: '',
      last_name: '',
      email: '',
      role: 0
    });
    todoService.create.and.returnValue(of(response));
    component.addTodo();
    const addButton = fixture.debugElement.query(By.css('.save-button')).nativeElement;
    addButton.click();

    expect(todoService.create).toHaveBeenCalledWith(todo);
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should update the todo when "Save" button is clicked', () => {
    const todo = new Todo();
    todo.title = 'Test title';
    todo.description = 'Test description';
    todo.user_id = 1;
    component.todo = todo;
    component.form.patchValue(todo);

    const response = { success: true };
    authService.getLoggedUser.and.returnValue({
      id: 1,
      first_name: '',
      last_name: '',
      email: '',
      role: 0
    });
    todoService.update.and.returnValue(of(response));
    component.editTodo();
    const saveButton = fixture.debugElement.query(By.css('.save-button')).nativeElement;
    saveButton.click();

    expect(todoService.update).toHaveBeenCalledWith(todo.id, todo);
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog when "Cancel" button is clicked', () => {
    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
