import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment')
export const decrement = createAction('decrement')
export const reset = createAction('reset')
// custom action
export const customIncrement = createAction('customIncrement', props<{ count: number }>())