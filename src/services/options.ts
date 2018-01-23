import * as models from '../types/models'

export const presetTables: models.IOption<models.ITableConfig>[] = [
    {
        id: '0',
        name: 'Easy',
        value: {
            width: 4,
            height: 4,
            symbols: 'numbers',
            font: 'Arial',
            fontColor: 'black',
            cellColor: 'white',
            textEffect: 'none',
            animation: 'none'
        }
    },
    {
        id: '1',
        name: 'Standard',
        value: {
            width: 5,
            height: 5,
            symbols: 'numbers',
            font: 'Arial',
            fontColor: 'black',
            cellColor: 'white',
            textEffect: 'none',
            animation: 'none'
        }
    },
    {
        id: '2',
        name: 'Hard',
        value: {
            width: 6,
            height: 6,
            symbols: 'numbers',
            font: 'Arial',
            fontColor: 'black',
            cellColor: 'white',
            textEffect: 'none',
            animation: 'none'
        }
    },
    {
        id: '3',
        name: 'Numbers & Letters',
        value: {
            width: 5,
            height: 5,
            symbols: 'numbersAndLetters',
            font: 'Arial',
            fontColor: 'black',
            cellColor: 'white',
            textEffect: 'none',
            animation: 'none'
        }
    },
    {
        id: '4',
        name: 'Numbers with Shadow',
        value: {
            width: 5,
            height: 5,
            symbols: 'numbers',
            font: 'Arial',
            fontColor: 'black',
            cellColor: 'white',
            textEffect: 'shadow',
            animation: 'none'
        }
    }
]
export const fonts: string[] = [
    'Arial'
]

export const fontColors: string[] = [
    'Black'
]