import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {
  createNFieldStackReducers,
  firebaseRefs,
  game,
  players,
  createStackReducersForNPlayers,
  somethingIsLoading,
  user,
  // meReducer,
} from './reducers';

const reducer = combineReducers({
  firebaseRefs,
  game,
  players,
  user,
  somethingIsLoading,
  // meReducer,
  ...createStackReducersForNPlayers(8),
  // see note in ./dynamicFieldStackReducerGenerator about this:
  ...createNFieldStackReducers(32),
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

export default createStore(reducer, composeWithDevTools(middleware));

export * from './reducers';
