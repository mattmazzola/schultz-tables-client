import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'
import * as models from '../types/models'
import { ThunkAction } from 'redux-thunk'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'

export const startScoreAsync = (): ActionObject =>
    ({
        type: AT.START_SCORE_ASYNC
    })

export const startScoreFulfilled = (value: string): ActionObject =>
    ({
        type: AT.START_SCORE_FULFILLED,
        value
    })

export const startScoreRejected = (reason: string): ActionObject =>
    ({
        type: AT.START_SCORE_REJECTED,
        reason
    })

export const startScoreThunkAsync = (): ThunkAction<any, any, any> => {
    return (dispatch) => {
        return fetch('https://schultztables.azurewebsites.net/api/scores/start', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${RSA.getAccessToken(microsoftProvider, '')}`
            },
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
            .then((startScoreResponse: models.IStartScoreResponse) => {
                dispatch(startScoreFulfilled(startScoreResponse.value))
                return startScoreResponse.value
            })
            .catch(error => {
                dispatch(getScoresRejected(error))
                console.error(error)
                throw new Error(error)
            })
    }
}

export const addScoreAsync = (score: models.IScoreRequest): ActionObject =>
    ({
        type: AT.ADD_SCORE_ASYNC,
        score
    })

export const addScoreFulfilled = (score: models.IScore): ActionObject =>
    ({
        type: AT.ADD_SCORE_FULFILLED,
        score
    })

export const addScoreRejected = (reason: string): ActionObject =>
    ({
        type: AT.ADD_SCORE_REJECTED,
        reason
    })

export const addScoreThunkAsync = (scoreRequest: models.IScoreRequest, user: models.IUser): ThunkAction<any, any, any> => {
    return (dispatch) => {
        return fetch('https://schultztables.azurewebsites.net/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${RSA.getAccessToken(microsoftProvider, '')}`
            },
            body: JSON.stringify(scoreRequest)
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
            .then((scoreResponse: models.IScoreResponse) => {
                const score: models.IScore = {
                    durationMilliseconds: scoreResponse.durationMilliseconds,
                    id: scoreResponse.id,
                    scoreDetailsId: scoreResponse.id,
                    userId: scoreResponse.userId,
                    user
                }
                dispatch(addScoreFulfilled(score))
            })
            .catch(error => {
                console.error(error)
                dispatch(addScoreRejected(error))
            })
    }
}

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
        return fetch('https://schultztables.azurewebsites.net/api/scores', {
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
                dispatch(getScoresFulfilled(scores))
            })
            .catch(error => {
                console.error(error)
                dispatch(getScoresRejected(error))
            })
    }
}

export const getScoreDetailsAsync = (): ActionObject =>
    ({
        type: AT.GET_SCORE_DETAILS_ASYNC
    })

export const getScoreDetailsFulfilled = (scoreDetails: models.IScoreDetails): ActionObject =>
    ({
        type: AT.GET_SCORE_DETAILS_FULFILLED,
        scoreDetails
    })

export const getScoreDetailsRejected = (reason: string): ActionObject =>
    ({
        type: AT.GET_SCORE_DETAILS_REJECTED,
        reason
    })

export const getScoreDetailsThunkAsync = (scoreDetailsId: string): ThunkAction<Promise<models.IScoreDetails | void>, any, any> => {
    return (dispatch) => {
        return fetch(`https://schultztables.azurewebsites.net/api/scores/${scoreDetailsId}/details`, {
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
            .then((scoreDetails: models.IScoreDetails) => {
                dispatch(getScoreDetailsFulfilled(scoreDetails))
                return scoreDetails
            })
            .catch(error => {
                console.error(error)
                dispatch(getScoreDetailsRejected(error))
                return error
            })
    }
}