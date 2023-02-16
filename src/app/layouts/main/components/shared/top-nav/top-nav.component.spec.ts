import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavComponent } from './top-nav.component';
import { AuthService } from 'src/app/services/shared/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { User } from 'src/app/models/user.model';
import { Language } from 'src/app/models/language.model';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;
  let authService: AuthService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [AuthService, DataService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    dataService = TestBed.inject(DataService);

    spyOn(authService, 'getLoggedUser').and.returnValue(new User());
    const response = { value: 'en', lang: 'English' };
    //spyOn(dataService, 'currentLanguage').and.returnValue(of(response));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the logged user on initialization', () => {
    expect(authService.getLoggedUser).toHaveBeenCalled();
    expect(component.loggedUser).toEqual(new User());
  });

  // it('should set the language on initialization', () => {
  //   expect(dataService.currentLanguage).toHaveBeenCalled();
  //   expect(component.language).toEqual('English');
  // });

  it('should call the data service to change the language', () => {
    const spy = spyOn(dataService, 'changeLanguage');
    const language = new Language();
    language.lang = 'English',
      language.value = 'en'
    component.translate(language);

    expect(spy).toHaveBeenCalledWith(language);
  });
});
