import { Component, OnInit } from '@angular/core';
import { AppError } from '../app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((posts: any[]) => (this.posts = posts));
  }

  createPost(input: HTMLInputElement): void {
    const post = { title: input.value, id: null };
    this.posts.splice(0, 0, post);
    input.value = '';

    this.service.create(post).subscribe(
      (newPost: any) => {
        post.id = newPost.id;
      },
      (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError);
        } else {
          throw error;
        }
      }
    );
  }

  updatePost(post): void {
    this.service.update(post).subscribe((updatedPost) => {
      console.log(updatedPost);
    });
  }

  deletePost(post): void {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id).subscribe({
      next: null,
      error: (error: AppError) => {
        this.posts.splice(index, 0, post);

        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else {
          throw error;
        }
      },
    });
  }
}
