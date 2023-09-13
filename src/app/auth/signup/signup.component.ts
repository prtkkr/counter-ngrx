import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signUpStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/shared.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  onSignUp() {
    if (!this.signupForm.valid) {
      this.signupForm.controls['email'].markAsTouched();
      this.signupForm.controls['password'].markAsTouched();
      return;
    }
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signUpStart(this.signupForm.value));
  }

  validateEmail() {
    const email = this.signupForm.get('email');
    if ((email?.touched || email?.dirty) && !email.valid) {
      if (email?.errors?.['required']) return 'Email is required';
      if (email?.errors?.['email']) return 'Invalid Email';
    }
    return null;
  }

  validatePassword() {
    const password = this.signupForm.get('password');
    if ((password?.touched || password?.dirty) && !password.valid) {
      if (password?.errors?.['required']) return 'Password is required';
      if (password?.errors?.['minlength'])
        return 'Password should be minimum 6 characters in length.';
    }
    return null;
  }
}
