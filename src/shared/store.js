/** Singleton Store */
import appReducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import {
  transferActionsToDatabase
} from './middlewares/transferActionsToDatabase'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk, transferActionsToDatabase))
  // applyMiddleware(transferActionsToDatabase)
)

export default store
