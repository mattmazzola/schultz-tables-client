import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './routes/App'
import { unregister } from './registerServiceWorker'
import './index.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export const createReduxStore = () => createStore(
  rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={createReduxStore()}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
unregister()
