import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserComponent } from './user.component';
import { AuthService } from 'src/app/services/shared/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/shared/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ResponseModel } from 'src/app/models/reponse.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authService: AuthService;
  let userService: UserService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, RouterTestingModule, MaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ApiService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    dataService = TestBed.inject(DataService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  // it('should call getUsers', () => {
  //   spyOn(authService, 'getLoggedUser').and.returnValue(new User());
  //   component.ngOnInit();

  //   expect(component.getUsers).toHaveBeenCalled();
  // });


  const response: ResponseModel = {
    success: true,
    message: '',
    data: [{
      id: 1,
      role: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com'
    }]
  };


  it('should set userList on successful response', () => {
    const users: User[] = [
      {
        id: 1,
        role: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com'
      }
    ];
    spyOn(userService, 'getAllUsers').and.returnValue(of(response));

    component.getUsers();

    expect(component.userList).toEqual(users);
  });

  // it('should log an error on error response', () => {
  //   const consoleSpy = spyOn(console, 'error');
  //   spyOn(userService, 'getAllUsers').and.returnValue(of({ error: 'Something went wrong' }));

  //   component.getUsers();

  //   expect(consoleSpy).toHaveBeenCalled();
  // });


  it('should set selected user in data service and navigate to user history page', () => {
    const user: User = {
      id: 1,
      role: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com'
    }
    spyOn(dataService, 'setSelectedUser');
    spyOn(component.router, 'navigate');

    component.onView(user);

    expect(dataService.setSelectedUser).toHaveBeenCalledWith(user);
    expect(component.router.navigate).toHaveBeenCalledWith(['user/history', { id: user.id, name: user.first_name }]);
  });

});
