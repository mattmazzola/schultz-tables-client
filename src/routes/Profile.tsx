import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../actions'
import { ReduxState } from '../types'
import './Profile.css'

class Profile extends React.Component<Props, {}> {
  render() {
    const { user, logout } = this.props
    return (
      <div>
        <h1>{user.name}</h1>
        <button className="button-logout" type="button" onClick={() => logout()}>Logout</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
      logout
  }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
  return {
      user: state.user
  }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Profile)
