import * as React from 'react'
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getScoresThunkAsync } from '../actions/scoresActions'
import { ReduxState } from '../types'
import './Scores.css'

interface State {
  isLoading: boolean
}

const initialState: State = {
  isLoading: false
}

class Scores extends React.Component<Props, State> {
  state = initialState

  componentWillMount() {
    if (this.props.scores.length === 0) {
      this.setState({
        isLoading: true
      })
      this.props.getScoresThunkAsync()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.isLoading === true && nextProps.scores.length > 0) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    return (
      <div className="scores">
        {this.state.isLoading
          ? <div className="score">Loading...</div>
          : this.props.scores.map(score =>
            <div className="score" key={score.id}>
              <span>{score.user ? score.user.name : 'Unknown'}</span>
              <span>{score.durationMilliseconds}</span>
            </div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
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