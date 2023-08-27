import { Action, createReducer, on } from '@ngrx/store';
import { SharedState, initialLoaderState } from './shared.state';
import { setErrorMessage, setLoadingSpinner } from './shared.action';

const _sharedReducer = createReducer(
  initialLoaderState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoader: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
