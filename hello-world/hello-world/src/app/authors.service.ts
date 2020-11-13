import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  getAuthors(): Array<string> {
    return ['author1', 'author2', 'author3'];
  }
}
