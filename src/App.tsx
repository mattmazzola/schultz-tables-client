import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Home from './Home'
import Scores from './Scores'
import Users from './Users'
import Profile from './Profile'

export const createReduxStore = () => createStore(rootReducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createReduxStore()}>
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
                <li><NavLink to="/profile" exact={true}>Profile</NavLink></li>
              </ul>
            </nav>
            <div>
              <Route path="/" exact={true} component={Home} />
              <Route path="/scores" exact={true} component={Scores} />
              <Route path="/users" exact={true} component={Users} />
              <Route path="/profile" exact={true} component={Profile} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
