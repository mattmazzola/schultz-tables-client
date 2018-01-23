import * as models from '../types/models'

export function guid(): string {
    var d = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}

export const randomize = <T>(xs: T[]): T[] => {
    let unrandomized = xs.slice(0);
    const randomized = [];

    while (unrandomized.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrandomized.length)
        const randomElement = unrandomized[randomIndex]

        randomized.push(randomElement)
        unrandomized.splice(randomIndex, 1)
    }

    return randomized;
}

export const generateTableConfig = (): models.ITableConfig =>
    ({
        width: 5,
        height: 5,
        symbols: 'numbers',
        font: 'Arial',
        fontColor: 'black',
        cellColor: 'white',
        textEffect: 'none',
        animation: 'none'
    })

export const generateSymbols = (tableConfig: models.ITableConfig): models.ISequence => {
    const length = tableConfig.width * tableConfig.height
    const gridSizeArray = Array(length).fill(0)
    const symbols = gridSizeArray.map((_, i) => i + 1).map(x => x.toString())
    const randomSymbols = randomize(symbols)

    return {
        expectedSequence: symbols,
        randomizedSequence: randomSymbols
    }
}

export const generateTable = (tableConfig: models.ITableConfig, sequence: models.ISequence): models.ITable => {
    const cells = sequence.randomizedSequence.map((symbol, i) => {
        const x = i % tableConfig.width + 1
        const y = Math.floor(i / tableConfig.width) + 1

        return {
            x,
            y,
            text: symbol,
            classes: []
        }
    })

    return {
        width: tableConfig.width,
        height: tableConfig.height,
        expectedSequence: sequence.expectedSequence,
        cells
    }
}

export const generateDefaultGameState = () =>
    ({
        startTime: new Date(),
        duration: 0,
        isStarted: false,
        isCompleted: false,
        isSoundEnabled: true,
        playSoundOnCorrect: false,
        expectedSymbolIndex: 0,
        userSequence: []
    })