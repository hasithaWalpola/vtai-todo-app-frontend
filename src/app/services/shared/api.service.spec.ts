import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, AuthService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request', () => {
    const mockResponse = { data: 'test' };
    const path = 'test';

    service.get(path).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.getBaseUrl()}${path}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should make a POST request', () => {
    const mockData = { data: 'test' };
    const mockResponse = { data: 'success' };
    const path = 'test';

    service.post(path, mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.getBaseUrl()}${path}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(JSON.stringify(mockData));
    req.flush(mockResponse);
  });

  it('should make a PUT request', () => {
    const mockData = { data: 'test' };
    const mockResponse = { data: 'success' };
    const path = 'test';

    service.put(path, mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.getBaseUrl()}${path}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(JSON.stringify(mockData));
    req.flush(mockResponse);
  });

  it('should make a DELETE request', () => {
    const mockResponse = { data: 'success' };
    const path = 'test';

    service.delete(path).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.getBaseUrl()}${path}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

});
