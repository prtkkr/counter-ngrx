import { CounterState } from 'src/app/counter/state/counter.state';
import { PostState } from 'src/app/posts/state/posts.state';
import { counterReducer } from 'src/app/counter/state/counter.reducer';
import { PostsReducer } from 'src/app/posts/state/posts.reducer';

export interface AppState {
  counter: CounterState;
  posts: PostState;
}

// export const AppReducer = {
//   counter: counterReducer,
//   posts: PostsReducer,
// };
