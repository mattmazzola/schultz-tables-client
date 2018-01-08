import { ActionObject } from '../types'
import { Score } from '../types/ActionObjects'
import { AT } from '../types/ActionTypes'

export const addScore = (score: Score): ActionObject =>
    ({
        type: AT.ADD_SCORE,
        score
    })