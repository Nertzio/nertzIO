import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {
  app,
  createNFieldStackReducers,
  createStackReducersForNPlayers,
  firebaseRefs,
  game,
  players,
  user,
} from './reducers';

const appReducer = combineReducers({
  app,
  firebaseRefs,
  game,
  players,
  user,
  ...createStackReducersForNPlayers(8),
  // see note in ./dynamicFieldStackReducerGenerator about this:
  ...createNFieldStackReducers(32),
})

export const resetRedux = () => {
  return {
    type: 'JOIN_GAME_MOUNTS',
  }
}

const reducer = (state, action) => {
  if(action.type === 'JOIN_GAME_MOUNTS') {
    state = undefined
  }
  return appReducer(state, action)
}

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

export default createStore(reducer, composeWithDevTools(middleware));

// export * from './user'
export * from './reducers';
