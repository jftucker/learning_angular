import { Component } from '@angular/core';
import { FavoriteChangedEventArgs } from './favorite/favorite.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tweet = {
    body: 'here is the body of a tweet...',
    isLiked: false,
    likesCount: 10,
  };

  post = {
    title: 'Title',
    isFavorite: true,
  };

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
    console.log('Favorite Changed: ', eventArgs);
  }
}
