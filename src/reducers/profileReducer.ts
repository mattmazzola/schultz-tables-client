import { ActionObject } from '../types'
import { ProfileState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: ProfileState = []

const reducer: Reducer<ProfileState> = (state = initialState, action: ActionObject): ProfileState => {
    switch (action.type) {
        case AT.GET_USER_SCORES_FULFILLED: {
            return [...action.scores]
        }
        default:
            return state
    }
}

export default reducer