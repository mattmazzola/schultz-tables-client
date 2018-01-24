export interface ITableConfig {
    symbols: string
    width: number
    height: number
    font: string
    fontColor: string
    cellColor: string
    textEffect: string
    animation: string
}

export interface ISequence {
    expectedSequence: string[]
    randomizedSequence: string[]
}

export interface ICell {
    x: number
    y: number
    text: string
    classes: string[]
}

export interface IUserSelection {
    correct: boolean
    time: Date
    cell: ICell
}

export interface IChosenCell {
    text: string
    used: boolean
    current: boolean
}

export interface IGameState {
    startTime: Date
    duration: number
    isStarted: boolean
    isCompleted: boolean
    isSoundEnabled: boolean
    playSoundOnCorrect: boolean
    expectedSymbolIndex: number
    userSequence: IUserSelection[]
}

export interface ITable {
    width: number
    height: number
    expectedSequence: string[]
    cells: ICell[]
}

export interface IOption<T> {
    id: string,
    name: string,
    value: T
}

export interface IUser {
    email: string
    name: string
    id: string
}


export interface IScoresResponse {
    scores: IScore[]
    users: IUser[]
}

export interface IScore {
    durationMilliseconds: number,
    id: string
    scoreDetailsId: string
    userId: string
    user: IUser | undefined
}

export interface IScoreRequest {
    duration: number
    endTime: Date
    expectedSequence: number[]
    randomizedSequence: number[]
    signedStartTime: string
    startTime: Date
    tableHeight: number
    tableWidth: number
    tableProperties: string[]
    userSequence: IUserSelection[]
}

export interface IScoreResponse {
    duration: string
    durationMilliseconds: number
    endTime: string
    id: string
    sequence: IUserSelection[]
    startTime: string
    tableLayoutId: string
    tableTypeId: string
    userId: string
}

export interface IStartScoreResponse {
    value: string
}