import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { ApiService } from '../shared/api.service';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, UserService]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should login', () => {
    const data = { email: 'test@example.com', password: 'testpassword' };
    const response = { token: 'test-token' };

    userService.login(data).subscribe((user: any) => {
      expect(user).toEqual(response);
    });

    const req = httpTestingController.expectOne(`${environment.api_base_url}login`);
    expect(req.request.method).toEqual('POST');

    req.flush(response);
  });

  it('should create a user', () => {
    const data = { name: 'Test User', email: 'test@example.com', password: 'testpassword' };
    const expectedUser = { id: 1, name: 'Test User', email: 'test@example.com' };

    userService.register(data).subscribe((user: any) => {
      expect(user).toEqual(expectedUser);
    });

    const req = httpTestingController.expectOne(`${environment.api_base_url}register`);
    expect(req.request.method).toEqual('POST');

    req.flush(expectedUser);
  });

  it('should get logged in user', () => {
    const expectedUser = { id: 1, name: 'Test User', email: 'test@example.com' };

    userService.getLoggedUser().subscribe((user: any) => {
      expect(user).toEqual(expectedUser);
    });

    const req = httpTestingController.expectOne(`${environment.api_base_url}logged/user`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedUser);
  });

  it('should get all users', () => {
    const expectedUsers = [
      { id: 1, name: 'Test User 1', email: 'test1@example.com' },
      { id: 2, name: 'Test User 2', email: 'test2@example.com' },
      { id: 3, name: 'Test User 3', email: 'test3@example.com' },
    ];

    userService.getAllUsers().subscribe((users: any) => {
      expect(users).toEqual(expectedUsers);
    });

    const req = httpTestingController.expectOne(`${environment.api_base_url}users`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedUsers);
  });

});
