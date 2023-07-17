import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from 'src/app/posts/state/posts.state';

const getPostsInitialState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsInitialState, (state) => {
  return state.posts;
});
