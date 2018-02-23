import { ActionObject } from '../types'
import { ProfileState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'
import * as models from '../types/models'
import { getUserTableTypeKey } from '../services/utilities';

const initialState: ProfileState = {
    tableTypes: [],
    scoresByUserAndType: new Map<string, models.IScoresResponse>()
}

const reducer: Reducer<ProfileState> = (state = initialState, action: ActionObject): ProfileState => {
    switch (action.type) {
        case AT.GET_TABLE_TYPES_FULFILLED: {
            return {
                ...state,
                tableTypes: action.tableTypes
            }
        }
        case AT.GET_USER_SCORES_FULFILLED: {
            // Create copy of existing map
            const key = getUserTableTypeKey(action.userId, action.tableTypeId)
            const scoresByUserAndType = new Map(state.scoresByUserAndType.entries())
            scoresByUserAndType.set(key, action.scoresResponse)

            return {
                ...state,
                scoresByUserAndType
            }
        }
        default:
            return state
    }
}

export default reducer