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

export const getUserScoresFulfilled = (scores: models.IScore[]): ActionObject =>
({
    type: AT.GET_USER_SCORES_FULFILLED,
    scores
})

export const getUserScoresRejected = (reason: string): ActionObject =>
({
    type: AT.GET_USER_SCORES_REJECTED,
    reason
})

export const getUserScoresThunkAsync = (userId: string): ThunkAction<any, any, any> => {
    return (dispatch) => {
        return fetch(`${baseUri}/api/scores?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${RSA.getAccessToken(microsoftProvider, '')}`
            }
        })
            .then(response => {
                const json = response.json()
                if (response.ok) {
                    return json
                }
                else {
                    throw new Error(JSON.stringify(json))
                }
            })
            .then((scoresResponse: models.IScoresResponse) => {
                const scores = scoresResponse.scores.map(score => {
                    const user = scoresResponse.users.find(u => u.id === score.userId)
                    score.user = user
                    return score
                })
                dispatch(getUserScoresFulfilled(scores))
            })
            .catch(error => {
                console.error(error)
                dispatch(getUserScoresRejected(error))
            })
    }
}