import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'
import * as models from '../types/models'
import { ThunkAction } from 'redux-thunk'
import { microsoftProvider } from '../providers/microsoft'
import RSA from 'react-simple-auth'
import { makeGraphqlRequest, makeGraphqlMutation } from '../services/graphql'
import * as utilities from '../services/utilities'

const baseUri = process.env.REACT_APP_ENV === 'development'
    ? 'http://localhost:4000'
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
    return async (dispatch) => {
        const response = await makeGraphqlRequest(
            "start",
            `mutation start {
                start (ignored: "") {
                    value
                }
            }`)

        if (!response.ok) {
            console.log(`status test: `, response.statusText)
            const text = await response.text()
            dispatch(startScoreRejected(text))
            throw new Error(text)
        }

        const responseJson: models.IStartScoreResponse = await response.json()
        const signedStartTime: string = responseJson.data.start.value
        dispatch(startScoreFulfilled(signedStartTime))
        return signedStartTime
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
    return async (dispatch) => {
        try {
            const graphModel = utilities.convertScoreRequstToGraphql(scoreRequest)
            // tableProperties: ${JSON.stringify(graphModel.tableProperties)}

            const response = await makeGraphqlMutation(
                "AddScore",
                `mutation AddScore {
                    addScore (scoreInput: {
                        signedStartTime: "${graphModel.signedStartTime}",
                        userId: "${user.id}",
                        startTime: ${graphModel.startTime},
                        endTime: ${graphModel.endTime},
                        expectedSequence: ${JSON.stringify(graphModel.expectedSequence)}
                        randomizedSequence: ${JSON.stringify(graphModel.randomizedSequence)},
                        userSequence: [
                            {
                                time: ${123},
                                cell: {
                                    text: "A",
                                    x: 1,
                                    y: 2
                                }
                                correct: true
                            }
                        ],
                        tableWidth: ${graphModel.tableWidth},
                        tableHeight: ${graphModel.tableWidth},
                        tableProperties: [
                            { key: "test", value:"testValue" },
                            { key: "tes2t", value:"testValue" }
                        ]
                    }) {
                        id
                        startTime
                        endTime
                        duration
                        sequence {
                            time
                            cell {
                                text
                                x
                                y
                            }
                            correct
                        }
                        tableTypeId
                        tableLayoutId
                    }
                }
            `)

            if (!response.ok) {
                console.log(`status test: `, response.statusText)
                const text = await response.text()
                throw new Error(text)
            }
            const json = await response.json();
            if (json.errors) {

            }
            const score: models.IScoreGraphql = json.data.addScore;
            console.log(`Score Added: `, score);
            // const score: models.IScore = {
            //     id: scoreResponse.id,
            //     durationMilliseconds: scoreResponse.durationMilliseconds,
            //     startTime: new Date(scoreResponse.startTime),
            //     endTime: new Date(scoreResponse.endTime),
            //     sequence: scoreResponse.sequence,
            //     tableLayout: null,
            //     tableType: null,
            //     user,
            //     userId: user.id
            // }
            dispatch(addScoreFulfilled(score.tableTypeId, score));
        }
        catch (error) {
            console.error(error);
            dispatch(addScoreRejected(error));
        }
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
    return async (dispatch) => {
        try {
            const response = await makeGraphqlRequest(
                null,
                `{
                    scores(tableTypeId: "8khL0PAzn1fLljSPPp6eGpcIHqbA6VPSHdkHGUeRb/s=") {
                      users {
                        id
                        email
                        name
                      }
                      scores {
                        id
                        userId
                        startTime
                        endTime
                        sequence {
                          cell {
                            x
                            y
                            text
                          }
                          time
                          correct
                        }
                        tableTypeId
                        tableLayoutId
                      }
                    }
                  }`)

            if (!response.ok) {
                console.log(`status test: `, response.statusText)
                const text = await response.text()
                throw new Error(text)
            }

            const json: models.IGraphQlResponse<{ scores: models.IScoresResponse }> = await response.json();
            json.data.scores.scores.forEach(score => {
                const user = json.data.scores.users.find(u => u.id === score.userId);
                score.user = user;
            });
            dispatch(getScoresFulfilled(tableTypeId, json.data.scores));
        }
        catch (error) {
            console.error(error);
            dispatch(getScoresRejected(error));
        }
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
    return async (dispatch: any) => {

        const response = await makeGraphqlRequest(
            null,
            `{
                tableTypes {
                    id
                    width
                    height
                    properties {
                        key
                        value
                    }
                }
            }`)

        if (!response.ok) {
            console.log(`status test: `, response.statusText)
            const text = await response.text()
            throw new Error(text)
        }

        const tableTypes: models.IGraphQlResponse<{ tableTypes: models.ITableType[] }> = await response.json()

        dispatch(getTableTypesFulfilled(tableTypes.data.tableTypes))
        return tableTypes.data.tableTypes
    }
}

export const getScoreDetailsAsync = (): ActionObject =>
    ({
        type: AT.GET_SCORE_DETAILS_ASYNC
    })

export const getScoreDetailsFulfilled = (scoreDetails: models.IScore): ActionObject =>
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
export const getScoreDetailsThunkAsync = (id: string): ThunkAction<Promise<models.IScore | void>, any, any> => {
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
            .then((scoreDetails: models.IScore) => {
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