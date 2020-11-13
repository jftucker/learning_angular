import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppError } from '../app-error';
import { NotFoundError } from '../common/not-found-error';
import { Observable, throwError } from 'rxjs';
import { BadInput } from '../common/bad-input';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http
      .get(this.url, { observe: 'response' })
      .map((response) => response.body);
    // .catch(this.handleError);
  }

  create(resource): Observable<any> {
    return this.http
      .post(this.url, JSON.stringify(resource), {
        observe: 'response',
      })
      .map((response) => response.body)
      .catch(this.handleError);
  }

  update(resource): Observable<any> {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }), {
        observe: 'response',
      })
      .map((response) => response.body)
      .catch(this.handleError);
  }

  delete(id): Observable<any> {
    return this.http
      .delete(this.url + '/' + id)
      .map((response: Response) => response.body)
      .retry(3)
      .catch(this.handleError);
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
