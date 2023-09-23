import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { getPostById } from 'src/app/posts/state/posts.selector';
import { updatePost } from 'src/app/posts/state/posts.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  editForm!: UntypedFormGroup;
  postSubscription!: Subscription;

  constructor(
    private formBuilder: UntypedFormBuilder,
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
    /*********************************************
     * Since Router Store is used *
     * No need to get route info using below logic*
    * this.route.params.subscribe((params) => { *
    *   const id = params['id']; *
    *   this.postSubscription = this.store *
    *     .select(getPostById(id)) *
    *     .subscribe((data: any) => { *
    *       this.postData = data; *
    *       this.createForm(); *
    *     }); *
    * }); *
    /***************************** */
    this.postSubscription = this.store
      .select(getPostById)
      .subscribe((post: any) => {
        if (post) {
          this.editForm.patchValue({
            id: post.id,
            title: post.title,
            description: post.description,
          });
        }
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

  onPostUpdate() {
    if (!this.editForm.valid) {
      return;
    }
    // Get Required Data
    const { id, title, description } = this.editForm.value;
    // Dispatch Action
    // const updatedPostData: Post = {
    //   id: id,
    //   title: title,
    //   description: description,
    // };
    this.store.dispatch(updatePost({ post: this.editForm.value }));
    // Navigate To Post Page
    // this.router.navigate(['posts']);
  }
}
