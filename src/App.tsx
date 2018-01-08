import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { State } from './types'
import Home from './Home'
import Login from './Login'
import Scores from './Scores'
import Users from './Users'
import Profile from './Profile'

const userIsAuthenticated = connectedRouterRedirect<any, State>({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // Determine if the user is authenticated or not
  authenticatedSelector: state => state.user.isLoggedIn,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

const locationHelper = locationHelperBuilder({})
const userIsNotAuthenticated = connectedRouterRedirect<any, State>({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // This prevents us from adding the query parameter when we send the user away from the login page
  // Determine if the user is authenticated or not
  authenticatedSelector: state => !state.user.isLoggedIn,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

const ProtectedHome = userIsAuthenticated(Home)
const ProtectedScores = userIsAuthenticated(Scores)
const ProtectedUsers = userIsAuthenticated(Users)
const ProtectedProfile = userIsAuthenticated(Profile)
const RedirectedLogin = userIsNotAuthenticated(Login)

class App extends React.Component<Props, {}> {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="app-header">
            <h2>Schultz Tables</h2>
          </div>
          <nav>
            <ul>
              <li><NavLink to="/" exact={true}>Home</NavLink></li>
              <li><NavLink to="/scores" exact={true}>Scores</NavLink></li>
              <li><NavLink to="/users" exact={true}>User</NavLink></li>
              {this.props.user.isLoggedIn && <li><NavLink to="/profile" exact={true}>Profile</NavLink></li>}
            </ul>
          </nav>
          <div>
            <Route path="/" exact={true} component={ProtectedHome} />
            <Route path="/login" exact={true} component={RedirectedLogin} />
            <Route path="/scores" exact={true} component={ProtectedScores} />
            <Route path="/users" exact={true} component={ProtectedUsers} />
            <Route path="/profile" exact={true} component={ProtectedProfile} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch)
}
const mapStateToProps = (state: State) => {
  return {
    user: state.user
  }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(App)
