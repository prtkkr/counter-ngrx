import { Post } from 'src/app/models/post.model';

export interface PostState {
  posts: Post[];
}

export const initialPostState: PostState = {
  posts: [
    { id: '1', title: 'Sample Title 1', description: 'Sample Desciption 1' },
    { id: '2', title: 'Sample Title 2', description: 'Sample Desciption 2' },
  ],
};
