import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppError } from '../app-error';
import { NotFoundError } from '../common/not-found-error';
import { Observable, throwError } from 'rxjs';
import { BadInput } from '../common/bad-input';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http
      .get(this.url, { observe: 'response' })
      .pipe(map((response) => response.body));
  }

  create(resource): Observable<any> {
    return this.http
      .post(this.url, JSON.stringify(resource), {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body),
        catchError(this.handleError)
      );
  }

  update(resource): Observable<any> {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }), {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body),
        catchError(this.handleError)
      );
  }

  delete(id): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      map((response: Response) => response.body),
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response): Observable<Error> {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError());
    }
    return throwError(new AppError(error));
  }
}
