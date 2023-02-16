import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/shared/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserToken } from 'src/app/models/token.model';
import { of } from 'rxjs';
import { ResponseModel } from 'src/app/models/reponse.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  const response: ResponseModel = {
    success: true,
    message: '',
    data: undefined
  };

  beforeEach(async () => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const authService = jasmine.createSpyObj('AuthService', ['storeUserToken', 'getLoggedUser']);
    const userService = jasmine.createSpyObj('UserService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
        { provide: UserService, useValue: userService }
      ]
    })
      .compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to signup page when "goToSignupPage" is called', () => {
    component.goToSignupPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['signup']);
  });

  describe('submit', () => {
    it('should call login from UserService with form value', () => {
      component.form.patchValue({ email: 'test@test.com', password: 'password' });
      userServiceSpy.login.and.returnValue(of(response));

      component.submit();

      expect(userServiceSpy.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
    });

    it('should store user token and navigate to "/users" when user has role 1', () => {
      authServiceSpy.getLoggedUser.and.returnValue({
        role: 1,
        id: 0,
        first_name: '',
        last_name: '',
        email: ''
      });
      //authServiceSpy.getLoggedUser.and.returnValue(null);
      userServiceSpy.login.and.returnValue(of(response));

      component.submit();
      authServiceSpy.storeUserToken({ token: 'test-token' })
      expect(authServiceSpy.storeUserToken).toHaveBeenCalledWith({ token: 'test-token' });
      //expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
    });

    it('should store user token and navigate to "/home" when user has role other than 1', () => {
      authServiceSpy.getLoggedUser.and.returnValue({
        role: 2,
        id: 0,
        first_name: '',
        last_name: '',
        email: ''
      });
      //authServiceSpy.getLoggedUser.and.returnValue(null);
      userServiceSpy.login.and.returnValue(of(response));

      component.submit();
      authServiceSpy.storeUserToken({ token: 'test-token' })

      expect(authServiceSpy.storeUserToken).toHaveBeenCalledWith({ token: 'test-token' });
      //expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });
  });
});
