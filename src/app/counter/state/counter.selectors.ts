import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "src/app/counter/state/counter.state";

// feature selector to get initial state
const getInitialState = createFeatureSelector<CounterState>('counter')

// selectors to get required data only
export const getCounter = createSelector(getInitialState, state => {
    return state.counter
})

export const getChannelName = createSelector(getInitialState, state => {
    return state.channelName
})