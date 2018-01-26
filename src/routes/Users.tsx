import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '../types'
import { getUsersThunkAsync } from '../actions'
import { NavLink } from 'react-router-dom'
import './Users.css'

interface State {
  isLoading: boolean
}

const initialState: State = {
  isLoading: false
}

class Users extends React.Component<Props, State> {
  state = initialState

  componentWillMount() {
    if (this.props.users.length === 0) {
      this.setState({
        isLoading: true
      })
      this.props.getUsersThunkAsync()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.isLoading === true && nextProps.users.length > 0) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    return (
      <div className="users">
        {this.state.isLoading
          ? <div className="user">Loading...</div>
          : this.props.users.map((user, i) =>
            <div className="user" key={user.id}>
              <span><i className="icon-person material-icons">person</i></span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span><NavLink to={{ pathname: `/users/${user.id}`, state: { user } }} exact={true}>Profile</NavLink></span>
            </div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    getUsersThunkAsync
  }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
  return {
    users: state.users
  }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Users)