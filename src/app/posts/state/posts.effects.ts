import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.state';
import { PostsService } from 'src/app/services/posts.service';
import { setLoadingSpinner } from 'src/app/store/shared.action';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from 'src/app/posts/state/posts.action';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postService: PostsService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  loadPosts$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postService.getPosts().pipe(
          map((data) => {
            return loadPostsSuccess({ post: data });
          })
        );
      })
    );
  });

  addPost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postService.addPosts(action.post).pipe(
          map((result) => {
            const newRecord: Post = { ...action.post, id: result.name };
            return addPostSuccess({ post: newRecord });
          })
        );
      })
    );
  });

  updatePost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(updatePost),
      mergeMap((action) => {
        return this.postService.updatePost(action.post).pipe(
          map((result) => {
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });

  deletePost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        return this.postService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  postListRedirect$ = createEffect(
    (): any => {
      return this.actions$.pipe(
        ofType(...[addPostSuccess, updatePostSuccess]),
        map(() => {
          this.router.navigate(['posts']);
        })
      );
    },
    { dispatch: false }
  );
}
