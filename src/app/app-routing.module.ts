import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from 'src/app/counter/counter/counter.component';
import { HomeComponent } from 'src/app/home/home.component';
import { PostListComponent } from 'src/app/posts/post-list/post-list.component';
import { AddPostComponent } from 'src/app/posts/add-post/add-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'counter', component: CounterComponent },
  {
    path: 'posts',
    component: PostListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent,
      }, {
        path: 'edit/:id'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
