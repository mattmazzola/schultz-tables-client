import * as models from '../types/models'
import { ActionObject } from '../types'
import { ScoresState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: ScoresState = {
    tableTypes: [],
    scoresByType: new Map<string, models.IScoresResponse>()
}

const reducer: Reducer<ScoresState> = (state = initialState, action: ActionObject): ScoresState => {
    switch (action.type) {
        case AT.GET_TABLE_TYPES_FULFILLED:
            return {
                ...state,
                tableTypes: action.tableTypes
            }
        case AT.GET_SCORES_FULFILLED:
            return {
                ...state,
                scoresByType: new Map<string, models.IScoresResponse>(state.scoresByType.entries()).set(action.tableTypeId, action.scoreResponse)
            }
        case AT.ADD_SCORE_FULFILLED:
            const prevScoreResponse = state.scoresByType.get(action.tableTypeId) || {
                scores: [],
                users: [],
                continuationToken: null
            }

            const nextScoresResponse = {
                ...prevScoreResponse,
                scores: [...prevScoreResponse.scores, action.score]
            }

            return {
                ...state,
                scoresByType: new Map<string, models.IScoresResponse>(state.scoresByType.entries()).set(action.tableTypeId, nextScoresResponse)
            }
        default:
            return state
    }
}

export default reducer