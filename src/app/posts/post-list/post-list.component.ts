import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from 'src/app/posts/state/posts.selector';
import { deletePost, loadPosts } from 'src/app/posts/state/posts.action';
import { setLoadingSpinner } from 'src/app/store/shared.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  postList!: Observable<Post[] | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postList = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: any) {
    if (confirm('Would you like to delete this post?')) {
      this.store.dispatch(deletePost({ id: id }));
    } else return;
  }
}
