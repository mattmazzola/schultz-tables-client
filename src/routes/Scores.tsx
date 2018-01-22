import * as React from 'react'
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addScore } from '../actions/scoresActions'
import { ReduxState } from '../types'

class Scores extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <h1>Scores</h1>
        <div>
          <button type="button" onClick={() => this.props.addScore({ name: `Score-${(new Date().getTime())}`, value: (Math.floor(Math.random() * 100)) })}>Add Score</button>
        </div>
        <ul>
          {this.props.scores.map((score, i) => {
            return <li>{score.name} - {score.value}</li>
          })}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    addScore
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