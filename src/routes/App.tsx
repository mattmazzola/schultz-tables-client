import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { ReduxState } from '../types'
import './App.css'
import Home from './Home'
import Login from './Login'
import Scores from './Scores'
import Users from './Users'
import User from './User'
import Profile from './Profile'
import NoMatch from './NoMatch'

const userIsAuthenticated = connectedRouterRedirect<any, ReduxState>({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // Determine if the user is authenticated or not
  authenticatedSelector: state => state.user.isLoggedIn,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

const locationHelper = locationHelperBuilder({})
const userIsNotAuthenticated = connectedRouterRedirect<any, ReduxState>({
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
          <header className="app-header">
            <div>
              <div className="banner">
                <h2>Schultz Tables</h2>
              </div>
              <nav>
                <NavLink className="link" to="/" exact={true}>
                  <div className="icon"><i className="material-icons">home</i></div>
                  <div className="label">Home</div>
                </NavLink>
                <NavLink className="link" to="/scores" exact={true}>
                  <div className="icon"><i className="material-icons">format_list_numbered</i></div>
                  <div className="label">Scores</div>
                </NavLink>
                <NavLink className="link" to="/users" exact={true}>
                  <div className="icon"><i className="material-icons">group</i></div>
                  <div className="label">User</div>
                </NavLink>
                <NavLink className="link" to="/profile" exact={true}>
                  <div className="icon"><i className="material-icons">account_circle</i></div>
                  <div className="label">Profile</div>
                </NavLink>
              </nav>
            </div>
          </header>
          <main>
            <Switch>
              <Route path="/" exact={true} component={ProtectedHome} />
              <Route path="/login" exact={true} component={RedirectedLogin} />
              <Route path="/scores" exact={true} component={ProtectedScores} />
              <Route path="/users" exact={true} component={ProtectedUsers} />
              <Route path="/profile" exact={true} component={ProtectedProfile} />
              <Route path="/users/:userId" component={User} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
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

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(App)
