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

// tsling:disable-next-line
export const startScoreThunkAsync = (): ThunkAction<any, any, any> => {
    return (dispatch) => {
        return fetch(`${baseUri}/api/scores/start`, {
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

export const addScoreAsync = (tableTypeId: string, score: models.IScoreRequest): ActionObject =>
    ({
        type: AT.ADD_SCORE_ASYNC,
        score
    })

export const addScoreFulfilled = (tableTypeId: string, score: models.IScore): ActionObject =>
    ({
        type: AT.ADD_SCORE_FULFILLED,
        tableTypeId,
        score
    })

export const addScoreRejected = (reason: string): ActionObject =>
    ({
        type: AT.ADD_SCORE_REJECTED,
        reason
    })

// tsling:disable-next-line
export const addScoreThunkAsync = (scoreRequest: models.IScoreRequest, user: models.IUser): ThunkAction<any, any, any> => {
    return (dispatch) => {
        return fetch(`${baseUri}/api/scores`, {
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
                    userId: scoreResponse.userId,
                    user
                }
                dispatch(addScoreFulfilled(scoreResponse.tableTypeId, score))
            })
            .catch(error => {
                console.error(error)
                dispatch(addScoreRejected(error))
            })
    }
}

export const getScoresAsync = (tableTypeId: string): ActionObject =>
    ({
        type: AT.GET_SCORES_ASYNC,
        tableTypeId
    })

export const getScoresFulfilled = (tableTypeId: string, scoreResponse: models.IScoresResponse): ActionObject =>
    ({
        type: AT.GET_SCORES_FULFILLED,
        tableTypeId,
        scoreResponse
    })

export const getScoresRejected = (reason: string): ActionObject =>
    ({
        type: AT.GET_SCORES_REJECTED,
        reason
    })
    
// tsling:disable-next-line
export const getScoresThunkAsync = (tableTypeId: string): ThunkAction<any, any, any> => {
    return (dispatch) => {
        return fetch(`${baseUri}/api/scores?tableTypeId=${encodeURIComponent(tableTypeId)}`, {
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
                scoresResponse.scores.forEach(score => {
                    const user = scoresResponse.users.find(u => u.id === score.userId)
                    score.user = user
                })
                dispatch(getScoresFulfilled(tableTypeId, scoresResponse))
            })
            .catch(error => {
                console.error(error)
                dispatch(getScoresRejected(error))
            })
    }
}


export const getTableTypesAsync = (): ActionObject =>
    ({
        type: AT.GET_TABLE_TYPES_ASYNC
    })

export const getTableTypesFulfilled = (tableTypes: models.ITableType[]): ActionObject =>
    ({
        type: AT.GET_TABLE_TYPES_FULFILLED,
        tableTypes
    })

export const getTableTypesRejected = (reason: string): ActionObject =>
    ({
        type: AT.GET_TABLE_TYPES_REJECTED,
        reason
    })

// tsling:disable-next-line
export const getTableTypesThunkAsync = (): ThunkAction<any, any, any> => {
    return (dispatch) => {
        return fetch(`${baseUri}/api/tableTypes`, {
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
            .then((tableTypes: models.ITableType[]) => {
                dispatch(getTableTypesFulfilled(tableTypes))
            })
            .catch(error => {
                console.error(error)
                dispatch(getTableTypesRejected(error))
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

// tsling:disable-next-line
export const getScoreDetailsThunkAsync = (id: string): ThunkAction<Promise<models.IScoreDetails | void>, any, any> => {
    return (dispatch) => {
        return fetch(`${baseUri}/api/scores/${id}`, {
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