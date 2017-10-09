import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {
  firebaseRefs,
  createStackReducersForNPlayers,
  createNFieldStackReducers, players, user,
} from './reducers';

const reducer = combineReducers({
  firebaseRefs,
  players,
  user,
  ...createStackReducersForNPlayers(8),
  // see note in ./dynamicFieldStackReducerGenerator about this:
  ...createNFieldStackReducers(32),
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

export default createStore(reducer, composeWithDevTools(middleware));

// export * from './user'
export * from './reducers';
