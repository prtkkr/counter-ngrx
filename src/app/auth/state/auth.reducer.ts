import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import { loginSuccess, logout, signUpSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signUpSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logout, (state, action) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
