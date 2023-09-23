import { Action, createReducer, on } from '@ngrx/store';
import {
  PostState,
  initialPostState,
  postsAdapter,
} from 'src/app/posts/state/posts.state';
import { Post } from 'src/app/models/post.model';
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostsSuccess,
  updatePostSuccess,
} from 'src/app/posts/state/posts.action';

const _PostsReducer = createReducer(
  initialPostState,
  on(addPostSuccess, (state: PostState, action: { post: Post }) => {
    // let post = { ...action.post };
    // // post.id = (state.posts.length + 1).toString();
    // return {
    //   ...state,
    //   posts: [...state.posts, post],
    // };
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state, action) => {
    // const updatedRecords = state.posts.map((x) => {
    //   return x.id === action.post.id ? action.post : x;
    // });
    // return {
    //   ...state,
    //   posts: [...updatedRecords],
    // };
    return postsAdapter.updateOne(action.post, state);
  }),
  // Delete Post
  on(deletePostSuccess, (state: PostState, action: { id: string }) => {
    // let updatedRecords = state.posts.filter((x) => x.id !== action.id);
    // return {
    //   ...state,
    //   posts: [...updatedRecords],
    // };
    return postsAdapter.removeOne(action.id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    // return {
    //   ...state,
    //   posts: action.post,
    // };
    return postsAdapter.setAll(action.post, state);
  })
);

export function PostsReducer(state: PostState | undefined, action: Action) {
  return _PostsReducer(state, action);
}
