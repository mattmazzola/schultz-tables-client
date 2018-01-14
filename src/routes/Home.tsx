import * as React from 'react'
import './Home.css'
import * as models from '../types/models'
import * as utilities from '../services/utilities'
import Game from '../components/Game'

interface State {
  isGameVisible: boolean
  gameTypes: string[]
  gameTypeSelected: string
  width: number
  height: number
  fonts: string[]
  fontSelected: string
  symbols: string[]

  table: models.ITable
  gameState: models.IGameState
}

const tableConfig = utilities.generateTableConfig()
const sequence = utilities.generateSymbols(tableConfig)
const table = utilities.generateTable(tableConfig, sequence)

const initialState: State = {
  isGameVisible: false,
  gameTypes: [
    'Standard',
    'Medium',
    'Hard'
  ],
  gameTypeSelected: 'Standard',
  width: 5,
  height: 5,
  fonts: [
    'Arial',
    'Helvetica',
    'Comic-Scans'
  ],
  fontSelected: 'Arial',
  symbols: [
    'a',
    'b',
    'c'
  ],

  table,
  gameState: utilities.generateDefaultGameState()
}

export default class Home extends React.Component<{}, State> {
  state = initialState

  onClickStart() {
    console.log(`onClickStart`)
    this.setState({
      isGameVisible: true
    })
  }

  onClickCloseGame = () => {
    this.setState({
      isGameVisible: false
    })
  }

  onChangeGameType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      gameTypeSelected: event.target.value
    })
  }

  onChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(event.target.value)
    this.setState({
      width
    })
  }

  onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(event.target.value)
    this.setState({
      height
    })
  }

  onChangeFont = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const font = event.target.value
    this.setState({
      fontSelected: font
    })
  }

  render() {
    return (
      <div className="home-page">
        <div>
          <button className="start-button" type="button" onClick={() => this.onClickStart()}>Start</button>
        </div>
        <div>
          <select
            className="game-type-selection"
            value={this.state.gameTypeSelected}
            onChange={this.onChangeGameType}
          >
            {this.state.gameTypes.map((gameType, i) =>
              <option key={i} value={gameType}>{gameType}</option>
            )}
          </select>
        </div>
        <div className="game-options">
          <div>Size:</div>
          <div>
            <div className="game-options-size">
              <div>
                <input
                  type="number"
                  value={this.state.width}
                  onChange={this.onChangeWidth}
                  min={2}
                  max={10}
                  required={true}
                  className="game-option-input"
                /> W
              </div>
              <div>
                <input
                  type="number"
                  value={this.state.height}
                  onChange={this.onChangeHeight}
                  min={2}
                  max={10}
                  required={true}
                  className="game-option-input"
                /> H
              </div>
            </div>
          </div>

          <div>Symbols:</div>
          <select
            className="game-options-select"
            value={this.state.gameTypeSelected}
            onChange={this.onChangeGameType}
          >
            {this.state.gameTypes.map((gameType, i) =>
              <option key={i} value={gameType}>{gameType}</option>
            )}
          </select>

          <div>Font:</div>
          <select
            className="game-options-select"
            value={this.state.fontSelected}
            onChange={this.onChangeFont}
          >
            {this.state.fonts.map((font, i) =>
              <option key={i} value={font}>{font}</option>
            )}
          </select>

          <div>Font-Color:</div>
          <select
            className="game-options-select"
            value={this.state.gameTypeSelected}
            onChange={this.onChangeGameType}
          >
            {this.state.gameTypes.map((gameType, i) =>
              <option key={i} value={gameType}>{gameType}</option>
            )}
          </select>

          <div>Cell-Color:</div>
          <select
            className="game-options-select"
            value={this.state.gameTypeSelected}
            onChange={this.onChangeGameType}
          >
            {this.state.gameTypes.map((gameType, i) =>
              <option key={i} value={gameType}>{gameType}</option>
            )}
          </select>

          <div>Text-Effect:</div>
          <select
            className="game-options-select"
            value={this.state.gameTypeSelected}
            onChange={this.onChangeGameType}
          >
            {this.state.gameTypes.map((gameType, i) =>
              <option key={i} value={gameType}>{gameType}</option>
            )}
          </select>

          <div>Animation:</div>
          <select
            className="game-options-select"
            value={this.state.gameTypeSelected}
            onChange={this.onChangeGameType}
          >
            {this.state.gameTypes.map((gameType, i) =>
              <option key={i} value={gameType}>{gameType}</option>
            )}
          </select>
        </div>

        {this.state.isGameVisible
          ? <div className="game-container">
            <Game
              table={this.state.table}
              gameState={this.state.gameState}
              onClickClose={this.onClickCloseGame}
            />
          </div>
          : <div className={`game-preview ${this.state.isGameVisible ? 'game-preview--expand' : ''}`}>
            <div className="game-container">
              <Game
                table={this.state.table}
                gameState={this.state.gameState}
                onClickClose={this.onClickCloseGame}
              />
            </div>
          </div>}
      </div>
    )
  }
}