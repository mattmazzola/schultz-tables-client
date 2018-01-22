import * as React from 'react'
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getScoresThunkAsync } from '../actions/scoresActions'
import { ReduxState } from '../types'
import './Scores.css'

class Scores extends React.Component<Props, {}> {
  componentWillMount() {
    if (this.props.scores.length === 0) {
      this.props.getScoresThunkAsync()
    }
  }

  render() {
    return (
      <div className="scores">
          {this.props.scores.map((score, i) =>
            <div className="score" key={i}>{score.user!.name} - {score.durationMilliseconds}</div>
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