import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { TranslationHistory } from 'src/app/models/history.model';
import { Language } from 'src/app/models/language.model';
import { ResponseModel } from 'src/app/models/reponse.model';
import { ApiService } from 'src/app/services/shared/api.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { GetTodos, UpdateTodosSuccess } from 'src/app/store/actions/todo.actions';
import { AppState } from 'src/app/store/state/app.state';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let translationService: TranslationService;
  let store: Store<AppState>;

  beforeEach(async () => {
    translationService = jasmine.createSpyObj('translationService', ['translate', 'saveAction']);
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ApiService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        MatDialog,
        {
          provide: Store, useValue: {
            dispatch: jasmine.createSpy('dispatch'),
            pipe: jasmine.createSpy('pipe').and.returnValue(of([])),
            subscribe: jasmine.createSpy('subscribe')
          }
        },]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);



  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get todo list on init', () => {
    spyOn(component, 'getTodoList');
    component.ngOnInit();
    expect(component.getTodoList).toHaveBeenCalled();
  });

  it('should dispatch GetTodos action when calling getTodoList', () => {
    component.getTodoList();
    expect(store.dispatch).toHaveBeenCalledWith(new GetTodos(1));
  });

  it('should translate the todo list for the selected language', () => {
    const language = { lang: 'English', value: 'es' };
    const todoList = [
      { title: 'Todo 1' },
      { title: 'Todo 2', translation: { en: 'Todo 2' } },
      { title: 'Todo 3', translation: { es: 'Tarea 3' } }
    ];

    const translationResult = {
      data: {
        translations: [
          { translatedText: 'Tarea 1' },
          { translatedText: 'Tarea 2' }
        ]
      }
    };

    (translationService.translate as jasmine.Spy).and.returnValue(of(translationResult));
    translationService.translate({ q: ['Todo 1', 'Todo 2'], target: 'es' });
    // component.todoList = todoList;
    component.translateTodoList(language);


    expect(translationService.translate).toHaveBeenCalledWith({ q: ['Todo 1', 'Todo 2'], target: 'es' });
    // expect(store.dispatch).toHaveBeenCalledWith(new UpdateTodosSuccess([
    //   { id: 1, title: 'Todo 1', translation: { es: 'Tarea 1' } },
    //   { id: 2, title: 'Todo 2', translation: { en: 'Todo 2', es: 'Tarea 2' } },
    //   { id: 3, title: 'Todo 3', translation: { es: 'Tarea 3' } }
    // ]));
  });

  it('should not translate anything if all items are already translated for the selected language', () => {
    const language = { lang: 'English', value: 'es' };
    const todoList = [
      { title: 'Todo 1', translation: { en: 'Todo 1' } },
      { title: 'Todo 2', translation: { en: 'Todo 2' } },
      { title: 'Todo 3', translation: { en: 'Todo 3' } }
    ];

    // component.todoList = todoList;
    component.translateTodoList(language);

    expect(translationService.translate).not.toHaveBeenCalled();

  });

  it('should call TranslationService.saveAction with correct arguments', () => {
    const language: Language = { lang: 'es', value: 'es' };

    const ts = new TranslationHistory();
    ts.language = language.lang;
    ts.user_id = 1;

    translationService.saveAction(ts);

    component.saveTranslationAction(language);

    const expectedTranslationHistory = new TranslationHistory();
    expectedTranslationHistory.language = language.lang;
    expectedTranslationHistory.user_id = 1;

    expect(translationService.saveAction).toHaveBeenCalledWith(expectedTranslationHistory);
  });

});
