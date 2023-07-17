import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from 'src/app/counter/state/counter.state';

// feature selector to get initial state
const getCounterInitialState = createFeatureSelector<CounterState>('counter');

// selectors to get required data only
export const getCounter = createSelector(getCounterInitialState, (state) => {
  return state.counter;
});

export const getChannelName = createSelector(
  getCounterInitialState,
  (state) => {
    return state.channelName;
  }
);
