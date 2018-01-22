import * as models from './models'

export type ScoresState = models.IScore[]

export type UsersState = models.IUser[]

export interface UserState {
    isLoggedIn: boolean
    id: string
    name: string
}

export interface ReduxState {
    user: UserState
    users: UsersState
    scores: ScoresState
}
