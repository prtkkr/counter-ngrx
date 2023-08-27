import { CounterState } from 'src/app/counter/state/counter.state';
import { PostState } from 'src/app/posts/state/posts.state';
import { SHARED_STATE_NAME } from 'src/app/store/shared.selector';
import { SharedReducer } from 'src/app/store/shared.reducer';
import { AUTH_STATE_NAME } from 'src/app/auth/state/auth.selector';
import { AuthReducer } from 'src/app/auth/state/auth.reducer';

export interface AppState {
  counter: CounterState;
  posts: PostState;
  [SHARED_STATE_NAME]: string | null;
}

export const appReducer = {
  // counter: counterReducer,
  // posts: PostsReducer,
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
};
