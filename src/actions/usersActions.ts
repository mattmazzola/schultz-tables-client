import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'
import * as models from '../types/models'
import { ThunkAction } from 'redux-thunk'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'
const baseUri = process.env.REACT_APP_ENV === 'development'
    ? 'https://localhost:44311'
    : 'https://schultztables.azurewebsites.net'
    
console.log(`using baseUri: `, baseUri)

export const getUsersAsync = (): ActionObject =>
    ({
        type: AT.GET_USERS_ASYNC
    })

export const getUsersFulfilled = (users: models.IUser[]): ActionObject => 
    ({
        type: AT.GET_USERS_FULFILLED,
        users
    })

export const getUsersRejected = (reason: string): ActionObject => 
    ({
        type: AT.GET_USERS_REJECTED,
        reason
    })

export const getUsersThunkAsync = (): ThunkAction<any, any, any> => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUri}/api/users`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${RSA.getAccessToken(microsoftProvider, '')}`
                }
            });

            if (!response.ok) {
                console.log(`status test: `, response.statusText)
                const text = await response.text()
                throw new Error(text)
            }

            const json = await response.json();
            const users: models.IUser[] = json;
            dispatch(getUsersFulfilled(users));
        }
        catch (error) {
            console.error(error);
            dispatch(getUsersRejected(error));
        }
    }
}