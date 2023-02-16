import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { ResponseModel } from 'src/app/models/reponse.model';
import { DataService } from 'src/app/services/data/data.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { UserHistoryComponent } from './user-history.component';

describe('UserHistoryComponent', () => {
  let component: UserHistoryComponent;
  let fixture: ComponentFixture<UserHistoryComponent>;
  let mockActivatedRoute;
  let mockDataService;
  let translationService: jasmine.SpyObj<TranslationService>;
  let mockRouter;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: {
          user: 'John',
          name: 'Doe'
        }
      }
    };

    mockDataService = jasmine.createSpyObj(['setSelectedUser']);
    const response: ResponseModel = {
      success: true,
      message: '',
      data: undefined
    };

    translationService = jasmine.createSpyObj(['getTranslationsByUser']);
    translationService.getTranslationsByUser.and.returnValue(of(response));

    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      declarations: [UserHistoryComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DataService, useValue: mockDataService },
        { provide: TranslationService, useValue: translationService },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the selected user based on the route params', () => {
    expect(component.selectedUser).toEqual({ user: 'John', name: 'Doe' });
  });

  // it('should get the translation history for the selected user', () => {
  //   component.getHistory();

  //   expect(translationService.getTranslationsByUser).toHaveBeenCalledWith(1);
  //   expect(component.userHistory.length).toEqual(2);
  // });

  it('should navigate to the user list when the back button is clicked', () => {
    component.backButton();

    expect(component.route.navigate).toHaveBeenCalledWith(['users']);
  });
});
