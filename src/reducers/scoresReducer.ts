import { ActionObject } from '../types'
import { ScoresState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: ScoresState = []

const reducer: Reducer<ScoresState> = (state = initialState, action: ActionObject): ScoresState => {
    switch (action.type) {
        case AT.ADD_SCORE:
            return [...state, action.score]
        default:
            return state
    }
}

export default reducer