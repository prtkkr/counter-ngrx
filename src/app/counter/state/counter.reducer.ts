import { createReducer, on } from "@ngrx/store"
import { initialState } from "src/app/counter/state/counter.state"
import { changeChannelName, customIncrement, decrement, increment, reset } from "src/app/counter/state/counter.actions"

const _counterReducer = createReducer(
    initialState,
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        }
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        }
    }),
    on(reset, (state) => {
        return {
            ...state,
            counter: 0
        }
    }),
    on(customIncrement, (state, action) => {
        return {
            ...state,
            counter: state.counter + action.count
        }
    }),
    on(changeChannelName, (state) => {
        return {
            ...state,
            channelName: 'Channel 1 Changed !!!'
        }
    })
)

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action)
}