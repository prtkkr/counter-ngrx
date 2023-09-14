import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Post } from 'src/app/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from 'src/app/posts/state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  addForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onReset() {
    this.addForm.reset();
  }

  validateDescription() {
    const description = this.addForm.get('description');
    if (description?.touched && !description.valid) {
      if (description?.errors?.['required'])
        return 'Description is a mandatory field.';
      if (description?.errors?.['minlength'])
        return 'Description should be minimum 10 characters in length.';
    }
    return null;
  }

  onAddPost() {
    if (!this.addForm.valid) {
      this.addForm.get('title')?.markAsTouched();
      this.addForm.get('description')?.markAsTouched();
      return;
    }

    const postData: Post = {
      title: this.addForm.value.title,
      description: this.addForm.value.description,
    };

    this.store.dispatch(addPost({ post: postData }));
  }
}
