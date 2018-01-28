import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout, getUserScoresThunkAsync } from '../actions'
import { ReduxState } from '../types'
import './Profile.css'

interface State {
  isLoading: boolean
}

const initialState: State = {
  isLoading: false
}

class Profile extends React.Component<Props, State> {
  state = initialState

  componentWillMount() {
    if (this.props.profile.length === 0) {
      this.setState({
        isLoading: true
      })
      this.props.getUserScoresThunkAsync(this.props.user.id)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.isLoading === true && nextProps.profile.length > 0) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const { user, logout } = this.props
    return (
      <div>
        <h1>{user.name}</h1>
        <button className="button-logout" type="button" onClick={() => logout()}>Logout</button>
        <h2>User Scores</h2>
        <div>
          {this.props.profile.map(s =>
            <div key={s.id}>{s.durationMilliseconds}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    logout,
    getUserScoresThunkAsync
  }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
  return {
    user: state.user,
    profile: state.profile
  }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Profile)
