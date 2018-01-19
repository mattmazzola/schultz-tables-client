import * as React from 'react'
import * as models from '../types/models'
import './Game.css'

interface Position {
    top: number
    bottom: number
    left: number
    right: number
    width: string
    height: string
}

interface Props {
    table: models.ITable
    gameState: models.IGameState
    onClickClose: () => void
}

interface State {
    position: Position
}

const initialState: State = {
    position: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: `100px`,
        height: `100px`
    }
}

export default class Game extends React.Component<Props, State> {
    state = initialState
    element: HTMLElement

    componentWillMount() {
        window.addEventListener("resize", this.onResize)
    }

    componentDidMount() {
        this.computeTablePosition()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize)
    }

    onRef = (element: HTMLElement | null) => {
        if (element) {
            this.element = element
        }
    }

    onResize = (event: UIEvent) => {
        this.computeTablePosition()
    }

    private computeTablePosition() {
        const rect = this.element.getBoundingClientRect();
        const maxSize = Math.min(rect.width, rect.height)
        const horizontalCenter = (rect.right - rect.left) / 2
        const left = horizontalCenter - (maxSize / 2)
        const verticalCenter = (rect.bottom - rect.top) / 2
        const top = verticalCenter - (maxSize / 2)

        const position: Position = {
            left,
            right: left + maxSize,
            top,
            bottom: top + maxSize,
            width: `${maxSize}px`,
            height: `${maxSize}px`
        }

        this.setState({
            position
        })
    }

    render() {
        return (
            <div className="game">
                <header className="game__header">
                    <div>
                        Header
                    </div>
                    <button onClick={() => this.props.onClickClose()}>Close</button>
                </header>
                <div className="game__table" ref={this.onRef}>
                    <div className="table" style={this.state.position}>
                        {this.props.table.cells.map((cell, i) =>
                            <div key={i} className="table__cell">
                                {cell.text}
                            </div>
                        )}
                    </div>
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
