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
    expectedSequence: any[]
    cells: ICell[]
}

export interface IOption {
    id: string
    name: string
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
