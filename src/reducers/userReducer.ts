import { ActionObject } from '../types'
import { AT, UserState } from '../types'
import { Reducer } from 'redux'

const initialState: UserState = {
    isLoggedIn: false,
    name: ""
};

const userReducer: Reducer<UserState> = (state = initialState, action: ActionObject): UserState => {
    switch (action.type) {
        case AT.USER_LOGIN:
            return { ...state, isLoggedIn: true, name: action.name }
        case AT.USER_LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

export default userReducer;