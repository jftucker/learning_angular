import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  template: ` {{ text | summary: 10 }} `,
})
export class CoursesComponent {
  text = `this and that this is a long piece of text because i dont know how to generate lorem ipsum dynamically`;
}
