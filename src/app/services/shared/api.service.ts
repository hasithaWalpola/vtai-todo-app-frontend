import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  //API request header
  get headers() {

    //Authenticated header
    if (this.authService.getUserToken()) {
      const token = this.authService.getUserToken();
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'aplication/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token.token,
      })

      //Without authentication header
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'aplication/json',
        'Access-Control-Allow-Origin': '*',
      })
    }
  }

  //Handle API related erros
  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ProgressEvent) {
    } else if (error.error.message) {
      if (error.error.message == 'Unauthenticated.') {
        this.authService.removerUserData();
        window.location.href = '/login'
      }
      return (
        error.error.message
      );
    } else {
      return (
        error.error
      );
    }
    //handler.showErrorMessage('Could not connect to remote server.')
    return (
      'Could not connect to remote server.'
    );
  }

  getBaseUrl() {

    return `${environment.api_base_url}`;

  }


  get(path: string): Observable<any> {
    return this.http
      .get<any>(this.getBaseUrl() + `${path}`, { headers: this.headers })
      .pipe(catchError(err => this.handleError(err)))
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post<any>(this.getBaseUrl() + `${path}`, JSON.stringify(body), { headers: this.headers }
      )
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put<any>(this.getBaseUrl() + `${path}`, JSON.stringify(body), { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete<any>(this.getBaseUrl() + `${path}`, { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

}
