import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { getPostById } from 'src/app/posts/state/posts.selector';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postData!: Observable<Post | null | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postData = this.store.select(getPostById);
  }
}
