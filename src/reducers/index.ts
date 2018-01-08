import { combineReducers } from 'redux'
import scoresReducer from './scoresReducer'
import userReducer from './userReducer'
import { State } from '../types'

export default combineReducers<State>({
    user: userReducer,
    scores: scoresReducer
})