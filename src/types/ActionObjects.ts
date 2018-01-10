import AT from './ActionTypes'

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

export type ActionObject =
    AddScoreAction |
    UserLoginAction |
    UserLogoutAction