import * as React from 'react'
import * as models from '../types/models'
import './GamePreview.css'

interface Props {
    table: models.ITable
}

export default class Game extends React.Component<Props, {}> {
    render() {
        return (
            <div className="game-preview">
                <div className="game-preview-content table-preview">
                    {this.props.table.cells.map((cell, i) =>
                        <div key={i} className="table-preview__cell">
                            {cell.text}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
