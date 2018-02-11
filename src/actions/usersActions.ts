import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'
import * as models from '../types/models'
import { ThunkAction } from 'redux-thunk'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'
const baseUri = process.env.NODE_ENV === 'development'
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
    return (dispatch) => {
        fetch(`${baseUri}/api/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${RSA.getAccessToken(microsoftProvider, '')}`
            }
        })
            .then(response => {
                const json = response.json()
                if(response.ok) {
                    return json
                }
                else {
                    throw new Error(JSON.stringify(json))
                }
            })
            .then((users: models.IUser[]) => {
                dispatch(getUsersFulfilled(users))
            })
            .catch(error => {
                console.error(error)
                dispatch(getUsersRejected(error))
            })
    }
}