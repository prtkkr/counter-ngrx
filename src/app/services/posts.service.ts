import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.API_URL).pipe(
      map((data) => {
        let arr: Post[] = [];
        for (let key in data) {
          arr.push({ ...data[key], id: key });
        }
        return arr;
      })
    );
  }

  addPosts(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(environment.API_URL, post);
  }

  updatePost(post: Post) {
    const data = {
      [post.id]: {
        title: post.title,
        description: post.description,
      },
    };
    return this.http.patch(environment.API_URL, data);
  }

  deletePost(id: string) {
    const url = `https://fir-auth-d77bb-default-rtdb.asia-southeast1.firebasedatabase.app/posts`;
    return this.http.delete(`${url}/${id}.json`);
  }
}
