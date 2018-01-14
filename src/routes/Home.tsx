import * as React from 'react'
import './Home.css'
import Game from '../components/Game'

interface State {
  isGameVisible: boolean
  gameTypes: string[]
  gameTypeSelected: string
  width: number
  height: number
}

const initialState: State = {
  isGameVisible: false,
  gameTypes: [
    'Standard',
    'Medium',
    'Hard'
  ],
  gameTypeSelected: 'Standard',
  width: 5,
  height: 5
}

export default class Home extends React.Component<{}, State> {
  state = initialState

  onClickStart() {
    console.log(`onClickStart`)
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
            value={this.state.gameTypeSelected}
            onChange={this.onChangeGameType}
          >
            {this.state.gameTypes.map((gameType, i) =>
              <option key={i} value={gameType}>{gameType}</option>
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

          {this.state.isGameVisible && <Game />}

        </div>
      </div>
    )
  }
}