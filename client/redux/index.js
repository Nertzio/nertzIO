import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import {
  firebaseRefs,
  createStackReducersForNPlayers,
  createNFieldStackReducers, players
} from './reducers';

const reducer = combineReducers({
  user,
  firebaseRefs,
  players,
  ...createStackReducersForNPlayers(8),
  // see note in ./dynamicFieldStackReducerGenerator about this:
  ...createNFieldStackReducers(32),
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

export default createStore(reducer, middleware);

export * from './user'
export * from './reducers';
