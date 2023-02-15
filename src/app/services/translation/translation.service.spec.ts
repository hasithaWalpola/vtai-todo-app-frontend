import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslationService } from './translation.service';
import { ApiService } from '../shared/api.service';
import { TranslationHistory } from 'src/app/models/history.model';
import { environment } from 'src/environments/environment';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, TranslationService],
    });
    service = TestBed.inject(TranslationService);
    httpMock = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('translate', () => {
    it('should make a POST request to the Google Translate API and return the response', () => {
      const mockResponse = { translations: [{ translatedText: 'Bonjour' }] };
      const mockObj = { q: 'Hello', target: 'fr' };
      service.translate(mockObj).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne(`${service.url}${service.key}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockObj);
      req.flush(mockResponse);
    });
  });

  describe('saveAction', () => {
    it('should call ApiService.post and return the response', () => {
      const mockResponse: any = { success: true };
      const mockData: TranslationHistory = { user_id: 2, language: 'en', createdAt: new Date().toDateString() };
      spyOn(apiService, 'post').and.returnValue(mockResponse);
      expect(service.saveAction(mockData)).toEqual(mockResponse);
      expect(apiService.post).toHaveBeenCalledWith('translation', mockData);
    });
  });

  describe('getTranslationsByUser', () => {
    it('should call ApiService.get and return the response', () => {
      const mockResponse: any = [{ id: 1, user_id: 2, translation: 'Hello -> Bonjour', created_at: new Date() }];
      const mockUserId = 2;
      spyOn(apiService, 'get').and.returnValue(mockResponse);
      expect(service.getTranslationsByUser(mockUserId)).toEqual(mockResponse);
      expect(apiService.get).toHaveBeenCalledWith(`translation/user/${mockUserId}`);
    });
  });
});
