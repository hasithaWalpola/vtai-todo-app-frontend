import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/services/shared/api.service';
import { AppState } from 'src/app/store/state/app.state';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let storeMock: jasmine.SpyObj<Store<AppState>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ApiService, { provide: Store, useValue: storeMock },]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
