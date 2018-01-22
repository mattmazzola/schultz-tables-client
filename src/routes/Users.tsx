import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from '../types'
import { getUsersThunkAsync } from '../actions'
import './Users.css'

export class Users extends React.Component<Props, {}> {
  componentWillMount() {
    if (this.props.users.length === 0) {
      this.props.getUsersThunkAsync()
    }
  }

  render() {
    return (
      <div className="users">
        {this.props.users.map((user, i) =>
          <div className="user" key={user.id}>{i} {user.name}: {user.email}</div>
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