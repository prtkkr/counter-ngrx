import { Action, createReducer, on } from '@ngrx/store';
import { PostState, initialPostState } from 'src/app/posts/state/posts.state';
import { addPost } from './posts.action';
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
  })
);

export function PostsReducer(state: PostState | undefined, action: Action) {
  return _PostsReducer(state, action);
}
