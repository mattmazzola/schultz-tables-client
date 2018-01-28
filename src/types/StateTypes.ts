import * as models from './models'

export type ScoresState = models.IScore[]

export type UsersState = models.IUser[]

export type ProfileState = models.IScore[]

export interface UserState extends models.IUser{
    isLoggedIn: boolean
}

export interface ReduxState {
    user: UserState
    users: UsersState
    scores: ScoresState
    profile: ProfileState
}
