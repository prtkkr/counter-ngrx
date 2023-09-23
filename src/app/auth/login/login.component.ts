import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/shared.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.required],
    });
  }

  onLogin() {
    if (!this.loginForm.valid) return;
    else {
      console.log(this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(loginStart({ email, password }));
    }
  }
}
