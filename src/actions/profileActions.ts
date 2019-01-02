import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'
import * as models from '../types/models'
import { ThunkAction } from 'redux-thunk'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'

console.log(`REACT_APP_ENV: `, process.env.REACT_APP_ENV)
const baseUri = process.env.REACT_APP_ENV === 'development'
    ? 'https://localhost:44311'
    : 'https://schultztables.azurewebsites.net'
    
export const getUserScoresAsync = (): ActionObject =>
({
    type: AT.GET_USER_SCORES_ASYNC
})

export const getUserScoresFulfilled = (userId: string, tableTypeId: string, scoresResponse: models.IScoresResponse): ActionObject =>
({
    type: AT.GET_USER_SCORES_FULFILLED,
    userId,
    tableTypeId,
    scoresResponse
})

export const getUserScoresRejected = (reason: string): ActionObject =>
({
    type: AT.GET_USER_SCORES_REJECTED,
    reason
})

export const getUserScoresThunkAsync = (tableTypeId: string, userId: string): ThunkAction<any, any, any> => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUri}/api/scores?tableTypeId=${encodeURIComponent(tableTypeId)}&userId=${encodeURIComponent(userId)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${RSA.getAccessToken(microsoftProvider, '')}`
                }
            })

            if (!response.ok) {
                console.log(`status test: `, response.statusText)
                const text = await response.text()
                throw new Error(text)
            }
            
            const json: models.IScoresResponse = await response.json()
            json.scores.map(score => {
                const user = json.users.find(u => u.id === score.userId)
                score.user = user
            })

            dispatch(getUserScoresFulfilled(userId, tableTypeId, json))
        }
        catch (error) {
            console.error(error)
            dispatch(getUserScoresRejected(error))
        }
    }
}