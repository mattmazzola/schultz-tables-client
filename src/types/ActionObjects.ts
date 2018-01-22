import AT from './ActionTypes'
import * as models from './models'

export interface StartScoreAsync {
    type: AT.START_SCORE_ASYNC
}

export interface StartScoreFulfilled {
    type: AT.START_SCORE_FULFILLED
    value: string
}

export interface StartScoreRejected {
    type: AT.START_SCORE_REJECTED
    reason: string
}

export interface AddScoreAsync {
    type: AT.ADD_SCORE_ASYNC
    score: models.IScoreRequest
}

export interface AddScoreFulfilled {
    type: AT.ADD_SCORE_FULFILLED
    score: models.IScore
}

export interface AddScoreRejected {
    type: AT.ADD_SCORE_REJECTED
    reason: string
}

export interface UserLoginAction {
    type: AT.USER_LOGIN
    id: string
    name: string
}

export interface UserLogoutAction {
    type: AT.USER_LOGOUT
}

export interface GetUsersAsyncAction {
    type: AT.GET_USERS_ASYNC
}

export interface GetUsersFulfilledAction {
    type: AT.GET_USERS_FULFILLED
    users: models.IUser[]
}

export interface GetUsersRejectedAction {
    type: AT.GET_USERS_REJECTED
    reason: string
}


export interface GetScoresAsyncAction {
    type: AT.GET_SCORES_ASYNC
}

export interface GetScoresFulfilledAction {
    type: AT.GET_SCORES_FULFILLED
    scores: models.IScore[]
}

export interface GetScoresRejectedAction {
    type: AT.GET_SCORES_REJECTED
    reason: string
}

export type ActionObject =
    StartScoreAsync |
    StartScoreFulfilled |
    StartScoreRejected |
    AddScoreAsync |
    AddScoreFulfilled |
    AddScoreRejected |
    UserLoginAction |
    UserLogoutAction |
    GetUsersAsyncAction |
    GetUsersFulfilledAction |
    GetUsersRejectedAction |
    GetScoresAsyncAction |
    GetScoresFulfilledAction |
    GetScoresRejectedAction