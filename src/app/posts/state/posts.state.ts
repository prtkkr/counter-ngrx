import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from 'src/app/models/post.model';

export interface PostState extends EntityState<Post> {}

export const postsAdapter = createEntityAdapter<Post>();

export const initialPostState: PostState = postsAdapter.getInitialState();
