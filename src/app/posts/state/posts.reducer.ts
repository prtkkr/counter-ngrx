import { Action, createReducer } from "@ngrx/store";
import { PostState, initialPostState } from "src/app/posts/state/posts.state";

const _PostsReducer = createReducer(initialPostState);

export function PostsReducer(state: PostState | undefined, action: Action) {
    return _PostsReducer(state, action);
} 