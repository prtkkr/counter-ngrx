import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoader = createSelector(getSharedState, (state) => {
  return state.showLoader;
});

export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
});
