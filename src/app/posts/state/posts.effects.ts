import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Update } from '@ngrx/entity';

import { AppState } from 'src/app/store/app.state';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { getPosts } from 'src/app/posts/state/posts.selector';
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
import { dummyAction } from 'src/app/auth/state/auth.actions';

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
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts.length || posts.length === 1)
          return this.postService.getPosts().pipe(
            map((data) => {
              return loadPostsSuccess({ post: data });
            })
          );
        else {
          return of(dummyAction());
        }
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
            let updatedPost: Update<Post> = {
              id: action.post.id,
              changes: { ...action.post },
            };
            return updatePostSuccess({ post: updatedPost });
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

  getSinglePost$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/detail');
      }),
      map((r: RouterNavigatedAction | any) => {
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postService.getSinglePost(id).pipe(
            map((post) => {
              const data = [{ ...post, id }];
              return loadPostsSuccess({ post: data });
            })
          );
        } else {
          return of(dummyAction());
        }
      })
    );
  });
}
