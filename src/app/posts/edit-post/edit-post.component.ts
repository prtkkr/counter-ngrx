import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { getPostById } from 'src/app/posts/state/posts.selector';
import { Post } from 'src/app/models/post.model';
import { updatePost } from 'src/app/posts/state/posts.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  postData!: Post;
  postSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    if (this.postSubscription) this.postSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // Render Form
    this.editForm = this.formBuilder.group({
      id: [null, Validators.required],
      title: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      description: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
    });
    // Get Data from URL
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.postSubscription = this.store
        .select(getPostById(id))
        .subscribe((data: any) => {
          this.postData = data;
          this.createForm();
        });
    });
  }

  validateDescription() {
    const description = this.editForm.get('description');
    if (description?.touched && !description.valid) {
      if (description?.errors?.['required'])
        return 'Description is a mandatory field.';
      if (description?.errors?.['minlength'])
        return 'Description should be minimum 10 characters in length.';
    }
    return null;
  }

  createForm() {
    this.editForm.setValue(this.postData);
  }

  onPostUpdate() {
    if (!this.editForm.valid) return;
    // Get Required Data
    const { id, title, description } = this.editForm.value;
    // Dispatch Action
    const updatedPostData: Post = {
      id: id,
      title: title,
      description: description,
    };
    this.store.dispatch(updatePost({ post: this.editForm.value }));
    // Navigate To Post Page
    this.router.navigate(['posts']);
  }
}
