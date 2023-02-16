import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslationHistory } from 'src/app/models/history.model';
import { ResponseModel } from 'src/app/models/reponse.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }
  url = `https://translation.googleapis.com/language/translate/v2?key=`;

  key = environment.api_key;

  public translate(obj: any): Observable<any> {
    return this.http.post(this.url + this.key, obj);
  }

  public saveAction(data: TranslationHistory): Observable<ResponseModel> {
    return this.api.post(`translation`, data);
  }

  public getTranslationsByUser(user_id: number): Observable<ResponseModel> {
    return this.api.get(`translation/user/${user_id}`);
  }

}
