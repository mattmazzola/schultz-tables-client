import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'
import * as models from '../types/models'
import { ThunkAction } from 'redux-thunk'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'

export const addScore = (score: models.IScore): ActionObject =>
    ({
        type: AT.ADD_SCORE,
        score
    })

export const getScoresAsync = (): ActionObject =>
    ({
        type: AT.GET_SCORES_ASYNC
    })

export const getScoresFulfilled = (scores: models.IScore[]): ActionObject => 
    ({
        type: AT.GET_SCORES_FULFILLED,
        scores
    })

export const getScoresRejected = (reason: string): ActionObject => 
    ({
        type: AT.GET_SCORES_REJECTED,
        reason
    })

export const getScoresThunkAsync = (): ThunkAction<any, any, any> => {
    return (dispatch) => {
        fetch('https://schultztables.azurewebsites.net/api/scores', {
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
            .then((scoresResponse: models.IScoresResponse) => {
                const scores = scoresResponse.scores.map(score => {
                    const user = scoresResponse.users.find(u => u.id === score.userId)
                    score.user = user
                    return score
                })
                dispatch(getScoresFulfilled(scores))
            })
            .catch(error => {
                console.error(error)
                dispatch(getScoresRejected(error))
            })
    }
}