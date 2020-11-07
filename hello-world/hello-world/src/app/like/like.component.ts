import { Component, Input } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
  styles: [
    `
      .fa {
        color: #ccc;
        cursor: pointer;
      }
      .active {
        color: deeppink;
      }
    `,
  ],
})
export class LikeComponent {
  @Input('isActive') isActive: boolean;
  @Input('likesCount') likesCount: number;

  onClick() {
    this.likesCount += this.isActive ? -1 : 1;
    this.isActive = !this.isActive;
  }
}
