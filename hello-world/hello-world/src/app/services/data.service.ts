import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppError } from '../app-error';
import { NotFoundError } from '../common/not-found-error';
import { throwError } from 'rxjs';
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

  getAll() {
    return this.http
      .get(this.url, { observe: 'response' })
      .map((response) => response.body)
      .catch(this.handleError);
  }

  create(resource) {
    return this.http
      .post(this.url, JSON.stringify(resource), {
        observe: 'response',
      })
      .map((response) => response.body)
      .catch(this.handleError);
  }

  update(resource) {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }), {
        observe: 'response',
      })
      .map((response) => response.body)
      .catch(this.handleError);
  }

  delete(id) {
    return (
      this.http
        .delete(this.url + '/' + id)
        .map((response: Response) => response.body)
        // .toPromise()
        .retry(3)
        .catch(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) return throwError(new BadInput(error));
    if (error.status === 404) return throwError(new NotFoundError());
    return throwError(new AppError(error));
  }
}