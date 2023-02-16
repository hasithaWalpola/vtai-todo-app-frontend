import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
    if (this.authService.getUserToken().token) {
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
    console.log(error.error.error)
    if (error.error instanceof ProgressEvent) {
      console.log(error)
    } else if (error.error.error) {
      if (error.error.error == 'unauthorized') {
        this.authService.removerUserData();
        window.location.href = '/login'
      }
      return throwError(() =>
        error.error.message
      );
    } else {
      return throwError(() =>
        error.error
      );
    }
    return throwError(() =>
      'Could not connect to remote server.'
    );
  }

  getBaseUrl() {

    return `${environment.api_base_url}`;

  }


  get<T>(path: string): Observable<T> {
    return this.http
      .get<T>(this.getBaseUrl() + `${path}`, { headers: this.headers })
      .pipe(catchError(err => this.handleError(err)))
  }

  post<T>(path: string, body: object): Observable<T> {
    return this.http
      .post<T>(this.getBaseUrl() + `${path}`, JSON.stringify(body), { headers: this.headers }
      )
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  put<T>(path: string, body: object): Observable<T> {
    return this.http
      .put<T>(this.getBaseUrl() + `${path}`, JSON.stringify(body), { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err))
      )
  }

  delete<T>(path: string): Observable<T> {
    return this.http
      .delete<T>(this.getBaseUrl() + `${path}`, { headers: this.headers })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

}
