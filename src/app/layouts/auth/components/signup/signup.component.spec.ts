import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResponseModel } from 'src/app/models/reponse.model';
import { User } from 'src/app/models/user.model';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['register']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      declarations: [SignupComponent],
      providers: [{ provide: UserService, useValue: userService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error message if passwords do not match', () => {
    component.form.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
      conirm_password: 'password123'
    });
    component.submit();
    expect(component.passwordMatch).toBeFalse();
  });

  it('should call user service register method when form is valid', () => {
    const response: ResponseModel = {
      success: true,
      message: '',
      data: undefined
    };
    userService.register.and.returnValue(of(response));
    component.form.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'P@ssword123',
      conirm_password: 'P@ssword123'
    });
    component.submit();
    const user = new User();
    user.first_name = component.form.value.first_name,
      user.last_name = component.form.value.last_name,
      user.email = component.form.value.email,
      user.password = component.form.value.password,
      user.role = 2
    expect(userService.register).toHaveBeenCalledWith(user);
    expect(component.error).toBe('');
  });

  it('should set error message when user service register method fails', () => {
    const errorResponse: ResponseModel = {
      success: true,
      message: '',
      data: undefined
    };
    userService.register.and.returnValue(of(errorResponse));
    component.form.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'P@ssword123',
      conirm_password: 'P@ssword123'
    });
    component.submit();
    expect(component.error).toBe('');
  });

  it('should navigate to login page after successful registration', () => {
    const response: ResponseModel = {
      success: true,
      message: '',
      data: undefined
    };
    userService.register.and.returnValue(of(response));
    spyOn(component.router, 'navigate');
    component.form.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'P@ssword123',
      conirm_password: 'P@ssword123'
    });
    component.submit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
