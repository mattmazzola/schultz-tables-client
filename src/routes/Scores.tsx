import * as React from 'react'
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTableTypesThunkAsync, getScoresThunkAsync } from '../actions/scoresActions'
import { ReduxState } from '../types'
import Score from '../components/Score'
import './Scores.css'

interface State {
  isLoading: boolean
  tableTypeIdSelected: string
}

const initialState: State = {
  isLoading: false,
  tableTypeIdSelected: ''
}

class Scores extends React.Component<Props, State> {
  state = initialState

  componentWillMount() {
    if (this.props.scores.tableTypes.length === 0) {
      this.setState({
        isLoading: true
      })
      this.props.getTableTypesThunkAsync()
    }
    else {
      this.setState({
        tableTypeIdSelected: this.props.scores.tableTypes[0].id
      })
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.isLoading === true && nextProps.scores.tableTypes.length > 0) {
      const tableTypeIdSelected = nextProps.scores.tableTypes[0].id
      this.setState({
        tableTypeIdSelected,
        isLoading: false
      })

      if (!this.props.scores.scoresByType.get(tableTypeIdSelected)) {
        this.props.getScoresThunkAsync(tableTypeIdSelected)
      }
    }

  }

  onChangeTableType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tableTypeIdSelected = event.target.value

    const existingScores = this.props.scores.scoresByType.get(tableTypeIdSelected)
    if (!Array.isArray(existingScores) || existingScores.length === 0) {
      this.props.getScoresThunkAsync(tableTypeIdSelected)
    }
    
    this.setState({
      tableTypeIdSelected
    })
  }

  onClickRefresh = () => {
    this.props.getTableTypesThunkAsync()
    this.props.getScoresThunkAsync(this.state.tableTypeIdSelected)
  }

  onClickLoadMore = (continuationToken: string) => {
    if (continuationToken !== null) {
      console.log('onClick Load more', continuationToken)
    }
  }

  render() {
    const scoresByType = this.props.scores.scoresByType.get(this.state.tableTypeIdSelected)
    return (
      <div className="scores-page">
        <div className="scores-types">
          {this.props.scores.tableTypes.length === 0
            ? <div>Loading...</div>
            : <select onChange={this.onChangeTableType} value={this.state.tableTypeIdSelected}>
                {this.props.scores.tableTypes.map(tableType => 
                  <option key={tableType.id} value={tableType.id}>{tableType.width} x {tableType.height} - {tableType.properties
                    .filter(({ key }) => {
                      console.log(key)
                      return ['symbols', 'fontColor', 'cellColor'].includes(key)
                    })
                    .map(({ value }) => `${value}`)
                    .join(', ')}
                  </option>
              )}
          </select>}
        </div>
        <div>
          <button className="score-refresh-button" onClick={this.onClickRefresh} disabled={this.state.tableTypeIdSelected === null}><i className="material-icons">refresh</i> Refresh</button>
        </div>
        <div className="scores">
          {this.state.tableTypeIdSelected === ''
            ? <div className="score-loading">Loading...</div>
            : !scoresByType
              ? <div className="score-loading">No scores for this table type</div>
              : <div>
                {scoresByType!.scores.map(score => <Score key={score.id} score={score} />)}
              </div>}
        </div>
        <div>
            {scoresByType && <button className="scores-loadmore-button" onClick={() => this.onClickLoadMore(scoresByType.continuationToken!)} disabled={scoresByType!.continuationToken === null}><i className="material-icons">file_download</i> Load More</button>}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    getTableTypesThunkAsync,
    getScoresThunkAsync
  }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
  return {
    scores: state.scores
  }
}

// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Scores)