import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from 'src/app/posts/state/posts.state';

const getPostsInitialState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsInitialState, (state) => {
  return state.posts;
});

// export const getPostById = createSelector(
//   getPostsInitialState,
//   (state: PostState, props: any) => {
//     return state.posts.find((x) => x.id == props.id);
//   }
// );

export const getPostById = (props: string) =>
  createSelector(getPostsInitialState, (state: PostState) => {
    return state.posts.find((x) => x.id == props);
  });
