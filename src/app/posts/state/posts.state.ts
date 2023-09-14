import { Post } from 'src/app/models/post.model';

export interface PostState {
  posts: Post[];
}

export const initialPostState: PostState = {
  // posts: [
  //   { id: '1', title: 'Sample Title 1', description: 'Sample Desciption 1' },
  //   { id: '2', title: 'Sample Title 2', description: 'Sample Desciption 2' },
  //   { id: '3', title: 'Sample Title 3', description: 'Sample Desciption 3' },
  //   { id: '4', title: 'Sample Title 4', description: 'Sample Desciption 4' },
  //   { id: '5', title: 'Sample Title 5', description: 'Sample Desciption 5' },
  // ],
  posts: [],
};
