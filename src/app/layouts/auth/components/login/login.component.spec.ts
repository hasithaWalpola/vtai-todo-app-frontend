import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/shared/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/shared/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ResponseModel } from 'src/app/models/reponse.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [ApiService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form when valid', fakeAsync(() => {
    // mock user service login method
    const response: ResponseModel = {
      success: true,
      message: '',
      data: undefined
    };
    spyOn(userService, 'login').and.returnValue(of(response));

    // mock user service getLoggedUser method
    // mock router navigate method
    spyOn(component.router, 'navigate');

    // set form values
    component.form.setValue({ email: 'test@test.com', password: 'password' });

    // trigger submit method
    component.submit();

    tick();

    expect(authService.storeUserToken).toHaveBeenCalledWith({ token: 'token' });
    expect(component.router.navigate).toHaveBeenCalledWith(['/users']);
  }));

  it('should not submit form when invalid', fakeAsync(() => {
    spyOn(userService, 'login');
    spyOn(component.router, 'navigate');
    component.form.setValue({ email: '', password: '' });
    component.submit();
    tick();
    expect(userService.login).not.toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  }));

  it('should set error message on error', fakeAsync(() => {
    spyOn(userService, 'login').and.returnValue(throwError({ error: 'error message' }));
    component.form.setValue({ email: 'test@test.com', password: 'password' });
    component.submit();
    tick();
    expect(component.error).toBe('error message');
  }));

  it('should navigate to signup page', () => {
    spyOn(component.router, 'navigate');
    component.goToSignupPage();
    expect(component.router.navigate).toHaveBeenCalledWith(['signup']);
  });
});

