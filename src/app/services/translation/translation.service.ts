import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  public translate(obj: any) {
    return firstValueFrom(this.http.post(this.url + this.key, obj));
  }

  public saveAction(data: any) {
    return firstValueFrom(this.api.post(`translation`, data));
  }

  public getTranslationsByUser(user_id: number) {
    return firstValueFrom(this.api.get(`translation/user/${user_id}`));
  }




}
