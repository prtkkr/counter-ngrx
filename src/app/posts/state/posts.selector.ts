import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState, postsAdapter } from 'src/app/posts/state/posts.state';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';

const getPostsInitialState = createFeatureSelector<PostState>('posts');

export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(
  getPostsInitialState,
  postsSelectors.selectAll
);

// export const getPostById = createSelector(
//   getPostsInitialState,
//   (state: PostState, props: any) => {
//     return state.posts.find((x) => x.id == props.id);
//   }
// );

export const getPostsEntities = createSelector(
  getPostsInitialState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  // getPostsInitialState,
  // getCurrentRoute,
  // (state, route: RouterStateUrl) => {
  //   return state ? state.posts.find((x) => x.id == route.params['id']) : null;
  // }
  getPostsEntities,
  getCurrentRoute,
  (state, route: RouterStateUrl) => {
    return state ? state[route.params['id']] : null;
  }
);
