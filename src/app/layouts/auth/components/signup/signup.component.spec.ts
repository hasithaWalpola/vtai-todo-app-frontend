import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    const response = { success: true };
    userService.register.and.returnValue(of(response));
    component.form.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'P@ssword123',
      conirm_password: 'P@ssword123'
    });
    component.submit();
    expect(userService.register).toHaveBeenCalledWith({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'P@ssword123',
      role: 2
    });
    expect(component.error).toBe('');
  });

  it('should set error message when user service register method fails', () => {
    const errorResponse = { error: 'Registration failed' };
    userService.register.and.returnValue(of(null, errorResponse));
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
    const response = { success: true };
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
