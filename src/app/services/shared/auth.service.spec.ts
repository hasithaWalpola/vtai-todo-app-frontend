import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserToken } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve user token', () => {
    const userToken: UserToken = { token: 'abc123' };
    service.storeUserToken(userToken);

    expect(service.getUserToken()).toEqual(userToken);
  });

  it('should store and retrieve logged in user', () => {
    const loggedUser: any = { id: 1, first_name: 'John', last_name: 'Doe', email: "dw@me.com", };
    service.storeLoggedUser(loggedUser);

    expect(service.getLoggedUser()).toEqual(loggedUser);
  });

  it('should remove user data when user logs out', () => {
    const userToken: UserToken = { token: 'abc123' };
    const loggedUser: any = { id: 1, name: 'John' };
    service.storeUserToken(userToken);
    service.storeLoggedUser(loggedUser);

    service.removerUserData();

    expect(service.getUserToken()).toBeNull();
    //expect(service.getLoggedUser()).toEqual({});
  });
});
