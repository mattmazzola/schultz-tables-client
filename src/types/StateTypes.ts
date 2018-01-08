import { Score } from './ActionObjects'

export type ScoresState = Score[]

export interface UserState {
    isLoggedIn: boolean
    name: string
}

export interface State {
    user: UserState
    scores: ScoresState
}
