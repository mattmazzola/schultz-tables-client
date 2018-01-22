import AT from './ActionTypes'
import * as models from './models'

export interface Score {
    name: string
    value: number
}

export interface AddScoreAction {
    type: AT.ADD_SCORE
    score: Score
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

export type ActionObject =
    AddScoreAction |
    UserLoginAction |
    UserLogoutAction |
    GetUsersAsyncAction |
    GetUsersFulfilledAction |
    GetUsersRejectedAction