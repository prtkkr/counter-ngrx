import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from 'src/app/posts/state/posts.selector';
import { Observable } from 'rxjs';
import { deletePost } from '../state/posts.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  postList!: Observable<Post[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postList = this.store.select(getPosts);
  }

  onDeletePost(id: any) {
    if (confirm('Would you like to delete this post?')) {
      this.store.dispatch(deletePost({ id: id }));
    } else return;
  }
}
