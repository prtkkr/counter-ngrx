import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostListComponent } from 'src/app/posts/post-list/post-list.component';
import { AddPostComponent } from 'src/app/posts/add-post/add-post.component';
import { EditPostComponent } from 'src/app/posts/edit-post/edit-post.component';
import { PostsReducer } from 'src/app/posts/state/posts.reducer';
import { PostsEffects } from 'src/app/posts/state/posts.effects';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent,
      },
      {
        path: 'edit/:id',
        component: EditPostComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [PostListComponent, AddPostComponent, EditPostComponent, PostDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('posts', PostsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {}
