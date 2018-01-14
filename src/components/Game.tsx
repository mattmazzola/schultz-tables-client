import * as React from 'react'
import * as models from '../types/models'
import './Game.css'


interface Props {
    table: models.ITable
    gameState: models.IGameState
    onClickClose: () => void
}

export default class Game extends React.Component<Props, {}> {
    render() {
        return (
            <div className="game">
                <header className="game__header">
                    <div>
                        Header
                    </div>
                    <button onClick={() => this.props.onClickClose()}>Close</button>
                </header>
                <div className="game__table">
                    {this.props.table.cells.map(cell =>
                        <div className="table__cell">
                            {cell.text}
                        </div>
                    )}
                </div>
                <footer className="game__footer">
                    {this.props.table.expectedSequence.map((symbol, i) =>
                        <div className="game-symbol" key={i}>{symbol}</div>
                    )}
                </footer>
            </div>
        );
    }
}
