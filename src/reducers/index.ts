import { combineReducers } from 'redux'
import scoresReducer from './scoresReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'
import { ReduxState } from '../types'

export default combineReducers<ReduxState>({
    user: userReducer,
    users: usersReducer,
    scores: scoresReducer
})