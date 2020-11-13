import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent {
  @Input('isFavorite') isSelected: boolean;
  @Output('change') click = new EventEmitter();

  onClick(): void {
    this.isSelected = !this.isSelected;
    this.click.emit({ newValue: this.isSelected });
  }
}
export interface FavoriteChangedEventArgs {
  newValue: boolean;
}
