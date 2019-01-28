import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'
import * as models from '../types/models'
import { ThunkAction } from 'redux-thunk'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'

console.log(`REACT_APP_ENV: `, process.env.REACT_APP_ENV)
const baseUri = process.env.REACT_APP_ENV === 'development'
    ? 'http://localhost:4000/'
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
            const response = await fetch(baseUri, {
                "credentials": "omit",
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9,ko;q=0.8",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    'Authorization': `Bearer ${RSA.getAccessToken(microsoftProvider, '')}`,
                    "pragma": "no-cache",
                    "sec-metadata": "destination=\"\", site=same-origin"
                },
                "body": JSON.stringify({
                    operationName: "start",
                    variables:{},
                    query: `mutation start {
                        start (ignored: "") {
                            valu
                        }
                    }`
                }),
                "method": "POST",
                "mode": "cors"
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