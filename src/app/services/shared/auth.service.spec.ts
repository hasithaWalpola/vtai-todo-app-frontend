import { TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
    });

    service = TestBed.inject(AuthService);
    jwtHelper = TestBed.inject(JwtHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store user token in local storage', () => {
    const userToken = { token: 'test-token' };
    const jwtDecodeSpy = spyOn(jwtHelper, 'decodeToken').and.returnValue({
      id: 1,
      name: 'Test User',
    });

    service.storeUserToken(userToken);

    expect(localStorage.getItem('userToken')).toEqual(
      JSON.stringify(userToken)
    );
    expect(jwtDecodeSpy).toHaveBeenCalled();
    expect(localStorage.getItem('loggedUser')).toEqual(
      JSON.stringify({ id: 1, name: 'Test User' })
    );
  });

  it('should get logged user from local storage', () => {
    const loggedUser = {
      "id": 1,
      "first_name": "Hasitha",
      "last_name": "Walpola",
      "email": "hw@me.com",
      "role": 2,
      "iat": 1676534286,
      "exp": 1679126286
    };
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

    expect(service.getLoggedUser()).toEqual(loggedUser);
  });

  it('should remove user data from local storage', () => {
    localStorage.setItem('userToken', 'test-token');
    localStorage.setItem('loggedUser', JSON.stringify({ id: 1, name: 'Test User' }));

    service.removerUserData();

    expect(localStorage.getItem('userToken')).toBeNull();
    expect(localStorage.getItem('loggedUser')).toBeNull();
  });
});
