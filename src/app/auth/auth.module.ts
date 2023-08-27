import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthReducer } from 'src/app/auth/state/auth.reducer';
import { AUTH_STATE_NAME } from 'src/app/auth/state/auth.selector';
import { AuthEffects } from 'src/app/auth/state/auth.effects';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    // StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    // EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
