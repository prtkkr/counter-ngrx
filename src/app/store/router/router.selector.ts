import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from 'src/app/store/router/custom-serializer';

export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getCurrentRoute = createSelector(getRouterState, (route) => {
  return route.state;
});
