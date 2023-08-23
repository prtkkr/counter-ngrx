import { Action, createReducer, on } from '@ngrx/store';
import { PostState, initialPostState } from 'src/app/posts/state/posts.state';
import { addPost, deletePost, updatePost } from './posts.action';
import { Post } from 'src/app/models/post.model';

const _PostsReducer = createReducer(
  initialPostState,
  on(addPost, (state: PostState, action: { post: Post }) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    const updatedRecords = state.posts.map((x) => {
      return x.id === action.post.id ? action.post : x;
    });
    return {
      ...state,
      posts: [...updatedRecords],
    };
  }),
  // Delete Post
  on(deletePost, (state: PostState, action: { id: string }) => {
    let updatedRecords = state.posts.filter((x) => x.id !== action.id);
    return {
      ...state,
      posts: [...updatedRecords],
    };
  })
);

export function PostsReducer(state: PostState | undefined, action: Action) {
  return _PostsReducer(state, action);
}
